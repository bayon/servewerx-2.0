import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import * as yup from "yup";
import { config } from "../../Constants";
import * as postAction from "../../redux/actions/postAction";
import CardInput from "../components/CardInput";

/*
TO GO: SPINNER: 
deps:
import FadeLoader from "react-spinners/FadeLoader";

fn:
let [loading, setLoading] = useState(false);
let [color, setColor] = useState("red");

jsx:
<div style={{position:"absolute",bottom:"25%",left:"50%"}} >
<FadeLoader color={"red"} loading={loading}  size={1} height={4} width={2}   />
</div>
*/

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "5vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

const formSchema = yup.object({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});
//end  part 1

function ButtonComponent(props) {
  const { onClick, loading } = props;
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={loading}
      style={{ marginTop: "15px", marginBottom: "15px" }}
    >
      {loading && <CircularProgress size={14} />}
      {!loading && "Register"}
    </Button>
  );
}

function PayPage(props) {
  console.log("------- ------- ------- >>> payPage props:", props);
  // if pay page props user id = me "607da64cdfa3380004aceabf" THEN post without pay.
  // props.currentPost.userId = "607da64cdfa3380004aceabf" THEN ...
  const [inProgress, setInProgress] = useState(false);
  console.log("inProgress:", inProgress);
  useEffect(() => {
    setInProgress(inProgress);
  }, [inProgress]);

  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { ...rest } = props;
  //live
  //const API_URL = "https://arcane-eyrie-05882.herokuapp.com"
  //local
  //const API_URL = "http://localhost:4000"
  const API_URL = config.url.API_URL;

  //FORM AND REDUX  part 2: default export function
  const dispatch = useDispatch();

  //end  part 2

  // State
  const [email, setEmail] = useState("");
  const [paid, setPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // if(props.currentPost.userId == "607da64cdfa3380004aceabf"){
  // dispatch(postAction.acceptPost(props.currentPost._id))
  //   .then((res) => {
  //     //console.log('accept post result: res:',res)
  //     setLoading(false);
  //   })
  //   .catch((err) => console.error(err));
  //  }

  const handleSubmitPay = async (event) => {
    console.log("handle submit pay......!!!!");
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    const res = await axios.post(`${API_URL}/pay`, { email: email });

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      // nos such payment_intent: 'pi_1IkbF1KxNNqNmAYU95kHMw3s'
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money is in the bank! 000");
        setPaid(true);
        dispatch(postAction.acceptPost(props.currentPost._id))
          .then((res) => {
            // console.log('accept post result: res:',res)
            alert("You Created A Post!");
            setLoading(false);
          })
          .catch((err) => console.error(err));
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      console.log("error: spot 1");
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
      console.log("error spot 2");
      console.log(result.error.message);
    } else {
      const res = await axios.post(`${API_URL}/sub`, {
        payment_method: result.paymentMethod.id,
        email: email,
      });
      // eslint-disable-next-line camelcase
      const { client_secret, status } = res.data;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log("There was an issue!");
            console.log(result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log("You got the money 1!");
            // Show a success message to your customer
            setPaid(true);
            dispatch(postAction.acceptPost(props.currentPost._id))
              .then((res) => {
                //console.log('accept post result: res:',res)
              })
              .catch((err) => console.error(err));
          }
        });
      } else {
        console.log("You got the money 2!");
        // No additional information was needed
        // Show a success message to your customer
        setPaid(true);
        dispatch(postAction.acceptPost(props.currentPost._id))
          .then((res) => {
            //console.log('accept post result: res:',res)
          })
          .catch((err) => console.error(err));
      }
    }
  };

  if (!inProgress) {
    console.log("paid:", paid);
    return (
      <div id="pay-page-card" style={{position:"absolute",top:"25%",left:"25%"}}>
        <Card className={classes.root}>
          <div style={{ position: "absolute", top: "0%", left: "0%" }}>
            <FadeLoader
              color={"red"}
              loading={loading}
              size={1}
              height={4}
              width={2}
            />
          </div>
          <CardContent className={classes.content}>
            <TextField
              label="Email"
              id="outlined-email-input"
              helperText={`Email you'll recive updates and receipts on`}
              margin="normal"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <CardInput />
            <div className={classes.div}>
              <p>One Post $1.00 per month starting on date submitted.</p>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmitPay}
              >
                Pay
              </Button>
              {/* <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitSub}>
            Subscription
          </Button> */}
            </div>
          </CardContent>
        </Card>
      </div>

      
    );
  } 
}

export default PayPage;
