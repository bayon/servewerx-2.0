import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useEffect, useState } from "react";
//import store from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
//import { Provider } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import "../App.css";
import * as authAction from "../redux/actions/authAction";
import * as postAction from "../redux/actions/postAction";
import PostStatus from "./components/PostStatus";
//import logo from "./app/assets/img/blue-cottage-840-464-widened-to-1024.png";
import Home from "./Home";
// import UsersPage from "./app/pages/UsersPage";
import "./navigation.css";
import SimpleMenu from './NavigationMenu';
import AllSitePostsPage from "./pages/AllSitePostsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";


const LinkStyle = styled.section`
  padding: 0.3em;
  height: 35px;
  background: #fff;
  color: #333;
  borderRadius:10px !important;
  opacity:.8;
`;

function Navigation(props) {
  var auth = useSelector((state) => state.auth.authorized);
  //console.log("initial auth is:", auth);
  const [user, setUser] = useState({}); //user is not 'used' but the call to userProfile is needed for ? auth ? 

  //GOES FALSE AFTER REFRESH: IS THAT DESIRED ?

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.userProfile())
      .then(async (result) => {
       // console.log("AUTH CHECK: profile to check auth ...result:", result);
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Router>
      <Toolbar style={{border:"solid 2px red",position:"fixed",top:"0px",left:"0px",right:"0px"}}  >
        <Grid container spacing={1} style={{marginTop:"20px", border:"dotted 1px white"}} >
          <SimpleMenu></SimpleMenu>
          <Grid item xs={12} sm={3}>
            <h2
              
            >
              Servewerx.com
            </h2>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div style={{ marginRight: 15 }}>
              <a
                href="tel:8122670592"
                style={{
                  color: "#333",
                  margin: "15px",
                  textDecoration: "none",
                  fontSize: "1em",
                }}
              >
                (812) 267-0592
                <Icon
                  style={{
                    color: "#333",
                    marginLeft: "5px",
                    textDecoration: "none",
                    fontSize: "1em",
                  }}
                >
                  phone
                </Icon>
              </a>
            </div>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Link style={{ textDecoration: "none" }} to="/">
              <LinkStyle>Home</LinkStyle>
            </Link>
          </Grid>

          {auth && (
            <>
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

              <Grid item xs={12} sm={1}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/allSitePosts"
                >
                  <LinkStyle>All Posts</LinkStyle>
                </Link>
              </Grid>


              <Grid item xs={12} sm={1}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/profile"
                >
                  <LinkStyle>My Profile</LinkStyle>
                </Link>
              </Grid>
              <Grid item xs={12} sm={1}  >
                  <PostStatus></PostStatus>
                </Grid>


              {/* <Grid item xs={12} sm={1}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/users"
                >
                  <LinkStyle>Users</LinkStyle>
                </Link>
              </Grid> */}
 

            </>
          )}

          {!auth ? (
            <>
              <Grid item xs={12} sm={1}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  <LinkStyle>Login</LinkStyle>
                </Link>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/register"
                >
                  <LinkStyle>Register</LinkStyle>
                </Link>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={1}>
              <Link
                style={{ textDecoration: "none",backgroundColor:"#ccc",color:"#fff" }}
                to="/logout"
                onClick={() => {
                  dispatch(authAction.logoutUser())
                    .then(async (result) => {
                      console.log("result:", result);
                      //PURGE post step vars: 
                      
                      localStorage.removeItem("forteworksToken");
                      dispatch(postAction.clearPost())
                      .then(async (result) => {
                          console.log('logout and cancel to purge post vars: result:',result)
                      })
                      .catch((err) => console.log(err));



                    })
                    .catch((err) => console.log(err));
                }}
              >
                <LinkStyle style={{ textDecoration: "none",backgroundColor:"#ccc",color:"#fff" }} >Logout</LinkStyle>
              </Link>
            </Grid>
          )}
        </Grid>
      </Toolbar>

      <Route exact path="/" component={Home} />
      <Route exact path="/build" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/dashboard" component={DashboardPage} />

      <Route path="/profile" component={ProfilePage} />
      {/* <Route path="/users" component={UsersPage} /> */}
      <Route path="/allSitePosts" component={AllSitePostsPage} />
      <Route path="/logout" component={Home} />
    </Router>
  );
}

export default Navigation;
