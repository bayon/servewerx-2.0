import Grid from "@material-ui/core/Grid";
import React from "react";
import HomeCardOne from "./cards/HomeCardOne";
import HomeCardThree from "./cards/HomeCardThree";
import HomeCardTwo from "./cards/HomeCardTwo";
import Footer from "./Footer";



export default function Home(props) {
  console.log('home props:',props)
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
              paddingTop:"100px"
            }}>
           
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
              
            </Grid>
         
        </Grid>
      </Grid>

      <Footer  />
    </React.Fragment>
  );
}

