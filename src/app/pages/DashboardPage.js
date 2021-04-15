import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import { config } from "../../Constants";
import StatusChecker from "../components/StatusChecker";
import PostStepOne from "./PostCreation/PostStepOne";
import UsersPostsPage from "./UsersPostsPage";

const HOST_URL = config.url.HOST_URL;

const LinkStyle = styled.section`
  padding: 0.3em;
  height: 35px;
  background: orange;
  color: #333;
`;

export default function DashboardPage(props) {
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  var haveUser = useSelector((state) => state.auth.haveUser);

  if (!auth) {
    return <div>not authorized.</div>;
  }
  return (
    <React.Fragment>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={10}>
          <h1>Dashboard</h1>
          <StatusChecker></StatusChecker>
        </Grid>
        <Grid item sm={2}>
          {haveUser && (
            <>
              <p>Hello, {user.data.fullName}</p>
              <img
                src={`${HOST_URL}/public/images/` + user.data.profileImage} //+ props.props.post.postImage
                alt="img"
                style={{ height: "100px", width: "auto", borderRadius: "15px" }}
              />
            </>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          {/* <PostCreatePage></PostCreatePage> */}

          <Router>
            <Grid item xs={12} sm={12}>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to="/postStepOne"
              >
                <LinkStyle>Create Post</LinkStyle>
              </Link>
            </Grid>
            <Route path="/postStepOne" component={PostStepOne} />
          </Router>



        </Grid>
        <Grid item xs={12} sm={6}>
          <UsersPostsPage></UsersPostsPage>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
/*
ROUTER CODE TO GO: 
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

<Router>


    <Grid item xs={12} sm={1}>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/dashboard"
      >
        <LinkStyle>Dashboard</LinkStyle>
      </Link>
    </Grid>

      <Route path="/dashboard" component={DashboardPage} />


</Router>

*/
