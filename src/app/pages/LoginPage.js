import { Card, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//FORM AND REDUX part 1: in header
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; //useSelector?
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as yup from "yup";
import * as authAction from "../../redux/actions/authAction";
// import logo from "../assets/img/pexels-pixabay-159201.jpg";
// import logo from "../assets/img/pexels-laurie-shaw-804392.jpg";
import DashboardPage from "./DashboardPage";

const formSchema = yup.object({
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
      {!loading && "Log In"}
    </Button>
  );
}

export default function LoginPage(props) {
  const [loading, setLoading] = useState(false);
  const { ...rest } = props; //?

  //FORM AND REDUX  part 2: default export function
  const dispatch = useDispatch();
  const [inProgress, setInProgress] = useState(false);
  console.log("inProgress:", inProgress);
  useEffect(() => {
    setInProgress(inProgress);
  }, [inProgress]);
  //end  part 2
  if (!inProgress) {
    return (
      <React.Fragment>
        <Grid
          container
          spacing={0}
          align="center"
          justify="center"
          direction="column"
        >
          <Paper
            style={{
              // backgroundImage: `url(${logo})`,
              // backgroundSize: "cover",
             background:"none",
              // opacity:".5",
              height: "750px",
            }}
          >
            <Grid item xs={12} style={{ marginTop: "25vh",width:"95%" ,opacity:".95"}}>
              {/* //FORM AND REDUX  part 3 JSX*/}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {
                  console.log("values:", values);
                  setInProgress(true);
                  setLoading(true);
                  dispatch(authAction.loginUser(values))
                    .then(async (result) => {
                      console.log("result:", result);
                      localStorage.setItem("forteworksToken", result.token);
                      // setTimeout(() => setLoading(false), 3000);
                      if (result.success) {
                        setInProgress(true);
                        setLoading(false);
                      } else {
                        setInProgress(false);
                        setLoading(false);
                      }
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {(props) => (
                  <Card>
                    <Grid
                      container
                      direction="column"
                      style={{ textAlign: "center" }}
                    >
                      <Grid item xs={12} sm={2}></Grid>
                      <Grid item xs={12} sm={8}>
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
                      </Grid>

                      <Grid item xs={12} sm={2}></Grid>
                    </Grid>
                  </Card>
                )}
              </Formik>

              {/* //end  part 3*/}
            </Grid>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <Router>
        <Route path="/login" component={DashboardPage} />
      </Router>
    );
  }
}

/*

  <React.Fragment>
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
      >
        <Paper
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "cover",
            height: "750px",
          }}
        >
          <Elements stripe={stripePromise}>
            <PayPage prop={props} />
          </Elements>
        </Paper>
      </Grid>
    </React.Fragment>
*/
