
 
import { CircularProgress, Icon } from "@material-ui/core";
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
  sms_secret: yup.string().required().min(4)
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

export default function FreeRegistrationPage(props) {

  const [loading, setLoading] = useState(false);
  const [inProgress, setInProgress] = useState(false);


  const dispatch = useDispatch() ;
  
    return (

<>


<React.Fragment>
  <Grid
    container
    spacing={0}
    align="center"
    justify="center"
    direction="column"
    style={{paddingBottom:"100px",fontSize:".8em"}}
  >
    
    <h1>Great! 
</h1>
<p>Once you register, you'll be able to create ads.</p>
    
      <Grid item xs={12} sm={12} style={{ marginTop: "15px" }}>
        {/* //FORM AND REDUX  part 3 JSX*/}
       
        <p>First, 'TEXT'  </p>
          
          <a href="sms:+17702855486&body=servewerx" style={{textDecoration:"none",fontWeight:"bold",}}>SERVEWERX <Icon>sms</Icon></a>

              <p>to get your code.</p>
              {/* <input name="sms_response" placeholder="sms response here."></input>
              <button onClick={ () => {console.log('need to verify user....phone....')} }>Submit Your Response</button> */}
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            sms_secret:"",
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
                    placeholder="Business Name or User Name"
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

                  <input
                    style={{
                      marginTop: "15px",
                      border: "none",
                      outline: "none",
                      borderBottom: "solid 1px #ddd",
                      padding: "10px",
                    }}
                    placeholder="Text Code"
                    onChange={props.handleChange("sms_secret")}
                    value={props.values.sms_secret}
                    onBlur={props.handleBlur("sms_secret")}
                  />
                  <div style={{ color: "salmon" }}>
                    {props.touched.sms_secret && props.errors.sms_secret}
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
      <p>Ads are <span style={{fontWeight:"bold"}}>$1.00</span> per month.</p>
<p>All payments made securely via <a href="https://stripe.com/"  style={{textDecoration:"none"}}>Stripe.com</a> </p>
<button onClick={props.close}>cancel</button>
  </Grid>
 
</React.Fragment>

</>


    )
}
