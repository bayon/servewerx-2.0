import Grid from "@material-ui/core/Grid";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React from "react";
import HomeCardOne from "./cards/HomeCardOne";
import HomeCardThree from "./cards/HomeCardThree";
import HomeCardTwo from "./cards/HomeCardTwo";

export default function Home(props) {
  console.log("home props:", props);
  return (
    <React.Fragment>
      <Grid container>
        <Parallax
          pages={2}
          style={{ top: "0", left: "0" }}
          className="component-full-background-image"
        >
          <ParallaxLayer
            offset={0}
            speed={2.5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // background:"red"
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justify="center"
                  direction="row"
                  style={{
                    // backgroundImage: `url(${logo})`,
                    // backgroundSize: "contain",
                    height: "500px",
                    backgroundRepeat: "no-repeat",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "100px",
                  }}
                >
                  <Grid item xs={12} sm={3}>
                    <HomeCardOne></HomeCardOne>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <HomeCardTwo></HomeCardTwo>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <HomeCardThree></HomeCardThree>
                  </Grid>
                  {/* <Grid item xs={12} sm={3}>
              <HomeCardFour browse={props.browse}></HomeCardFour> 
              </Grid> */}
                  <Grid item xs={12} sm={12}>
                    <div style={{ marginTop: "40vh" }}>
                      <div className="server-logo-transparent"></div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              boxShadow: "-8px 0px 20px #000",
            }}
            className="component-background-image"
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              spacing={1}
              direction="column"
              style={{textShadow:"1px 1px #000"}}
            >
              <h1>Browse for Free</h1>
              <Grid item>
                <h2>One Dollar</h2>
              </Grid>
              <Grid item>
                <h1>$1</h1>
              </Grid>
              <Grid item>
                <h2>To Post An Ad per month</h2>
              </Grid>
              <Grid item>
                <p>post as many ads as you'd like.</p>
              </Grid>
            </Grid>
          </ParallaxLayer>
        </Parallax>
      </Grid>
    </React.Fragment>
  );
}

/*
TO GO: reat-spring Parallax 

import { Parallax, ParallaxLayer } from "@react-spring/parallax";


 <Parallax pages={2} style={{ top: "0", left: "0" }}>
        <ParallaxLayer
          offset={0}
          speed={2.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Scroll down</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2}
          style={{ backgroundColor: "#ff6d6d" }}
        />

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <p>Scroll up</p>
        </ParallaxLayer>
      </Parallax>

*/
