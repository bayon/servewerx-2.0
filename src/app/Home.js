import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import logo from "./assets/img/pexels-pixabay-159201.jpg";
import BackendAnimatedCard from "./cards/BackendAnimatedCard";
import DatabaseAnimatedCard from "./cards/DatabaseAnimatedCard";
import FrontEndAnimatedCard from "./cards/FrontEndAnimatedCard";
import Footer from "./Footer";

export default function Home(props) {
 
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Paper
            style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              height: "400px",
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FrontEndAnimatedCard></FrontEndAnimatedCard>
        </Grid>

        <Grid item xs={12} sm={4}>
          <DatabaseAnimatedCard></DatabaseAnimatedCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <BackendAnimatedCard></BackendAnimatedCard>
        </Grid>
      </Grid>

      <Footer title="Footer" description="Now you know too much!" />
    </React.Fragment>
  );
}
