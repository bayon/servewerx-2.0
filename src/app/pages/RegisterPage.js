import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import logo from "../assets/img/pexels-pixabay-159201.jpg";
import PayPage from "./PayPage";


const stripePromise = loadStripe("pk_test_7aHY16H2I0thccZMQJIDUNpi");

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
            height: "400px",
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
