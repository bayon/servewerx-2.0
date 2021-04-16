import Grid from "@material-ui/core/Grid";
import React from "react";
import BackendAnimatedCard from "./cards/BackendAnimatedCard";
import DatabaseAnimatedCard from "./cards/DatabaseAnimatedCard";
import FrontEndAnimatedCard from "./cards/FrontEndAnimatedCard";
import Footer from "./Footer";

export default function Home(props) {
  return (
    <React.Fragment>
      <Grid container  >
        <Grid item xs={12} sm={12}>
         
            <Grid container spacing={1} alignItems="center" justify="center" direction="row"  style={{
              // backgroundImage: `url(${logo})`,
              // backgroundSize: "contain",
              height: "750px",
              backgroundRepeat: "no-repeat",
              alignItems: "center",
              justifyContent: "center",
            }}>
           
              <Grid item xs={12} sm={3}>
                <FrontEndAnimatedCard></FrontEndAnimatedCard>
              </Grid>

              <Grid item xs={12} sm={3}>
                <DatabaseAnimatedCard></DatabaseAnimatedCard>
              </Grid>
              <Grid item xs={12} sm={3}>
                <BackendAnimatedCard></BackendAnimatedCard>
              </Grid>
              
            </Grid>
         
        </Grid>
      </Grid>

      <Footer  />
    </React.Fragment>
  );
}
