
import { CircularProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as yup from "yup";
import { config } from '../../Constants';
import * as postAction from "../../redux/actions/postAction";
import CardInput from '../components/CardInput';
import Home from "../Home";






const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '5vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
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
  console.log('payPage props:',props)
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
const API_URL = config.url.API_URL

  //FORM AND REDUX  part 2: default export function
  const dispatch = useDispatch();

  //end  part 2

  // State
  const [email, setEmail] = useState('');
  const [paid,setPaid] = useState(false); 
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const res = await axios.post(`${API_URL}/pay`, {email: email});

    const clientSecret = res.data['client_secret'];

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
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank! 000');
        setPaid(true)
        dispatch(postAction.acceptPost(props.currentPost._id))
        .then((res) => {
          console.log('accept post result: res:',res)

        })
        .catch((err) => console.error(err))
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
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await axios.post(`${API_URL}/sub`, {'payment_method': result.paymentMethod.id, 'email': email});
      // eslint-disable-next-line camelcase
      const {client_secret, status} = res.data;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function(result) {
          if (result.error) {
            console.log('There was an issue!');
            console.log(result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log('You got the money 1!');
            // Show a success message to your customer
            setPaid(true)
                dispatch(postAction.acceptPost(props.currentPost._id))
                     .then((res) => {
                       console.log('accept post result: res:',res)

                     })
                     .catch((err) => console.error(err))
          }
        });
      } else {
        console.log('You got the money 2!');
        // No additional information was needed
        // Show a success message to your customer
        setPaid(true)
        dispatch(postAction.acceptPost(props.currentPost._id))
        .then((res) => {
          console.log('accept post result: res:',res)

        })
        .catch((err) => console.error(err))
      }
    }
  };

if (!inProgress) {
  return (
    <>
    { !paid && 
      <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField
          label='Email'
          id='outlined-email-input'
          helperText={`Email you'll recive updates and receipts on`}
          margin='normal'
          variant='outlined'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <CardInput />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
            Pay
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitSub}>
            Subscription
          </Button>
        </div>
      </CardContent>
    </Card>

    } 
    { paid && 

    <><h1>NOTIFY THE USER OF SUCCESS {props.currentPost.id}</h1></>
    // <>
    //   <h1>Welcome!</h1>
    //   <p>Now you just need to create your password.</p>
    //   <React.Fragment>
    //     <Grid
    //       container
    //       spacing={0}
    //       align="center"
    //       justify="center"
    //       direction="column"
    //     >
    //       <Paper
    //         style={{
    //           backgroundImage: `url(${logo})`,
    //           backgroundSize: "cover",
    //           height: "400px",
    //         }}
    //       >
    //         <Grid item xs={12} sm={6} style={{ marginTop: "15px" }}>
    //           {/* //FORM AND REDUX  part 3 JSX*/}
    //           <Formik
    //             initialValues={{
    //               fullName: "",
    //               email: email,
    //               password: "",
    //             }}
    //             validationSchema={formSchema}
    //             onSubmit={(values) => {
    //               console.log("values:", values);
    //               setInProgress(true);
    //               setLoading(true);
    //               dispatch(authAction.registerUser(values))
    //                 .then(async (result) => {
    //                   console.log("register result:", result);
    //                   localStorage.setItem("forteworksToken", result.token);
    //                   localStorage.setItem("registerToken", result.token);
    //                   setTimeout(() => setLoading(false), 3000);
    //                   if (result.success) {
    //                     setInProgress(true);
    //                     //setLoading(false)
    //                   }
    //                 })
    //                 .catch((err) => console.log(err));
    //             }}
    //           >
    //             {(props) => (
    //               <Card>
    //                 <div>
    //                   <div style={{ textAlign: "center" }}>
    //                     <input
    //                       style={{
    //                         marginTop: "15px",
    //                         border: "none",
    //                         outline: "none",
    //                         borderBottom: "solid 1px #ddd",
    //                         padding: "10px",
    //                       }}
    //                       placeholder="Business Name or User Name"
    //                       onChange={props.handleChange("fullName")}
    //                       value={props.values.fullName}
    //                       onBlur={props.handleBlur("fullName")}
    //                     />
    //                     <div style={{ color: "salmon" }}>
    //                       {props.touched.fullName && props.errors.fullName}
    //                     </div>
    //                     <input
    //                       style={{
    //                         marginTop: "15px",
    //                         border: "none",
    //                         outline: "none",
    //                         borderBottom: "solid 1px #ddd",
    //                         padding: "10px",
    //                       }}
    //                       placeholder="Email"
    //                       onChange={props.handleChange("email")}
    //                       value={props.values.email}
    //                       onBlur={props.handleBlur("email")}
    //                     />
    //                     <div style={{ color: "salmon" }}>
    //                       {props.touched.email && props.errors.email}
    //                     </div>
    //                     <input
    //                       style={{
    //                         marginTop: "15px",
    //                         border: "none",
    //                         outline: "none",
    //                         borderBottom: "solid 1px #ddd",
    //                         padding: "10px",
    //                       }}
    //                       placeholder="Password"
    //                       onChange={props.handleChange("password")}
    //                       value={props.values.password}
    //                       onBlur={props.handleBlur("password")}
    //                     />
    //                     <div style={{ color: "salmon" }}>
    //                       {props.touched.password && props.errors.password}
    //                     </div>

    //                     <ButtonComponent
    //                       onClick={props.handleSubmit}
    //                       loading={loading}
    //                     />
    //                   </div>
    //                 </div>
    //               </Card>
    //             )}
    //           </Formik>
             

    //           {/* //end  part 3*/}
    //         </Grid>
    //       </Paper>
    //     </Grid>
       
    //   </React.Fragment>
    //   </>
      
    }
    </>
   
  );
} else {
  return (
    <Router>
    <Route  path="/register" component={Home} />
  </Router>
  )
}
}

export default PayPage;
