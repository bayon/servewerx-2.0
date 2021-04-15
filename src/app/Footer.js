import { Container, Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import '../App.css';
const bayon =
  "https://media-exp1.licdn.com/dms/image/C4D03AQHXzD5ZUmbpSw/profile-displayphoto-shrink_200_200/0/1516574446401?e=1619049600&v=beta&t=4hI89lgoF7rS7uomD0_kLlEtVIIRHJn6Dobs06yP5UE";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        forteworks.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

 

export default function Footer(props) {
   

  return (
    <footer style={{height:"100px"}} >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={4}>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
            
              <div style={{ marginTop: 15 }}>
                {/* <a
                  href="http://www.bayonforte.com/Forte_2021_gmail.pdf"
                  target="blank"
                  style={{ textDecoration: "none", color: "#222",fontWeight:"bold" }}
                  download
                >
                  Resume
                </a> */}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{ marginTop: "20px" ,color:"#555", fontSize:".8em"}}>
              <div>

                forteworks: web applications
              </div>
             
             <div>

                Saas, MVP, Mobile Apps, Prototypes
             </div>
             
              <Copyright />
            </div>
          </Grid>

          <Grid item xs={12} sm={4}>
          <div style={{ marginTop: 15 }}>
                <a
                  href="tel:8122670592"
                  style={{ color: "#222", textDecoration: "none" }}
                >
                  (812) 267-0592<Icon className="appIcon">phone</Icon>
                </a>
              </div>
              <div style={{ marginTop: 15 }}>
                <a
                  href="mailto:forteworks@gmail.com"
                  style={{ color: "#222", textDecoration: "none" }}
                >
                  forteworks@gmail.com<Icon className="appIcon">email</Icon>
                </a>
              </div>
            {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
              <img
                src={bayon}
                alt="..."
                style={{ borderRadius: "25px", height: "100px" }}
              />
            </div> */}
            
          </Grid>
        </Grid>
      </Container>
      

    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
