import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
//import logo from "../assets/img/pexels-pixabay-159201.jpg";
import logo from "../assets/img/pexels-laurie-shaw-804392.jpg";
import PayPage from "./PayPage";



const stripePromise = loadStripe("pk_live_c03o8lC0VMl6y5eBpZ1eov45");

export default function RegisterPage(props) {
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
  );
}
