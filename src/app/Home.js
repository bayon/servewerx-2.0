import Card from "@material-ui/core/Card";
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
            speed={1}
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
            speed={2}
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
              style={{ marginBottom: "40px" }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                style={{
                  textShadow: "1px 0px #000",
                  
                }}
              >
                <h2>Browse Business Cards For Free</h2>
                <p>Register and post cards for $1.</p>
                <p>( securely through 'Stripe' )</p>
                <h3>Find, People and Work, Near You.</h3>
              </Grid>

              <Card style={{ padding: "15px",margin:"50px" }}>
                <Grid container direction="row"   alignItems="center"
                    justify="center">
                  <Grid
                    item
                    xs={12}
                    sm={10}
                    style={{
                      textAlign: "left",
                      fontSize: ".7em",
                      padding: "2em",
                    
                    }}
                  >
                    <h3>Why Servewerx?</h3>
                    <p>It's a simple bulletin board for your business card basically.</p>
                    <p>
                      I worked construction and remodeling jobs for 15 years
                      straight, back in the 90's and early 2000's. For the last
                      11 years I've been working creating web applications. I
                      recently decided to start up a small remodeling business
                      myself, 'Blue Cottage Remodeling'. And I've noticed that
                      getting your name out there is a little more expensive
                      than I'd like.
                    </p>
                    <p>
                      It can cost about $15 a week to put an ad in your local
                      paper and about $5 to post on other sites. Then you should
                      probably create a 'facebook' page for yourself. I think
                      that's free, but to promote it you have to spend some
                      money. Not to mention the more expensive advertising
                      options.
                    </p>
                    <p>
                      So I figured I'd just do it for free, but then you know,
                      there'd be people who didn't really care, posting crazy
                      stuff. So I'm charging a dollar for a month is a pretty
                      good deal for both you and me. And everytime I put an add
                      out for Servewerx, your name gets out there too.
                    </p>
                    <p>
                      I'll make more cool features for you in the future but for
                      now this is what I got. 
                    </p>

                    <p> - Bayon Forte </p>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2}
                  
                    
                  >
                    <div
                      className="creatorImage"
                      style={{ height: "100px" }}
                    ></div>
                  </Grid>
                </Grid>
              </Card>
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
