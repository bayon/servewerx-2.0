
 
import { CircularProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import * as yup from "yup";
// import { config } from '../../Constants';
import * as authAction from "../../redux/actions/authAction";



const formSchema = yup.object({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

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

export default function FreeRegistrationPage() {

  const [loading, setLoading] = useState(false);
  const [inProgress, setInProgress] = useState(false);


  const dispatch = useDispatch() ;
  
    return (

<>
<h1>Great!</h1>
<p>Once you register, you'll be able to create ads.</p>

<React.Fragment>
  <Grid
    container
    spacing={0}
    align="center"
    justify="center"
    direction="column"
  >
    
      <Grid item xs={12} sm={6} style={{ marginTop: "15px" }}>
        {/* //FORM AND REDUX  part 3 JSX*/}
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            console.log("values:", values);
            setInProgress(true);
            setLoading(true);
            dispatch(authAction.registerUser(values))
              .then(async (result) => {
                console.log("register result:", result);
                localStorage.setItem("forteworksToken", result.token);
                localStorage.setItem("registerToken", result.token);
                setTimeout(() => setLoading(false), 3000);
                if (result.success) {
                  setInProgress(true);
                  //setLoading(false)
                  alert('You Are Registered, next go to your Profile page and fill in your info.')
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          {(props) => (
            <Card>
              <div>
                <div style={{ textAlign: "center" }}>
                  <input
                    style={{
                      marginTop: "15px",
                      border: "none",
                      outline: "none",
                      borderBottom: "solid 1px #ddd",
                      padding: "10px",
                    }}
                    placeholder="Full Name"
                    onChange={props.handleChange("fullName")}
                    value={props.values.fullName}
                    onBlur={props.handleBlur("fullName")}
                  />
                  <div style={{ color: "salmon" }}>
                    {props.touched.fullName && props.errors.fullName}
                  </div>
                  <input
                    style={{
                      marginTop: "15px",
                      border: "none",
                      outline: "none",
                      borderBottom: "solid 1px #ddd",
                      padding: "10px",
                    }}
                    placeholder="Email"
                    onChange={props.handleChange("email")}
                    value={props.values.email}
                    onBlur={props.handleBlur("email")}
                  />
                  <div style={{ color: "salmon" }}>
                    {props.touched.email && props.errors.email}
                  </div>
                  <input
                    style={{
                      marginTop: "15px",
                      border: "none",
                      outline: "none",
                      borderBottom: "solid 1px #ddd",
                      padding: "10px",
                    }}
                    placeholder="Password"
                    onChange={props.handleChange("password")}
                    value={props.values.password}
                    onBlur={props.handleBlur("password")}
                  />
                  <div style={{ color: "salmon" }}>
                    {props.touched.password && props.errors.password}
                  </div>

                  <ButtonComponent
                    onClick={props.handleSubmit}
                    loading={loading}
                  />
                </div>
              </div>
            </Card>
          )}
        </Formik>
       

        {/* //end  part 3*/}
      </Grid>
   
  </Grid>
 
</React.Fragment>
<p>Ads are $1.00 per month.</p>
<p>All payments made securely via <a href="https://stripe.com/"  style={{textDecoration:"none"}}>Stripe.com</a> </p>

</>


    )
}
