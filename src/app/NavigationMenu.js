import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Icon from "@material-ui/core/Icon";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import * as authAction from "../redux/actions/authAction";
import * as postAction from "../redux/actions/postAction";
import Home from "./Home";
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
  borderradius: 10px !important;
  opacity: 0.8;
`;

export default function NavigationMenu() {
  var auth = useSelector((state) => state.auth.authorized);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    //check authorization
    dispatch(authAction.userProfile())
      .then(async (result) => {
        setUser(result.data);
        console.log("user:", user);
      })
      .catch((err) => console.log(err));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("anchorEl:", anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
       <Router>
      <Toolbar style={{border:"solid red 1px",position:"fixed",top:"0px",left:"0px",right:"0px",zIndex:"101",background:"#fff"}}>
        <Grid container spacing={1}>
         
            <IconButton
              edge="start"
              aria-controls="simple-menu"
              aria-haspopup="true"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <LinkStyle>
                  <Link to="/">Home</Link>
                </LinkStyle>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <LinkStyle>
                  <Link to="/allSitePosts">All Posts</Link>
                </LinkStyle>
              </MenuItem>
              {auth && (
                <>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <LinkStyle>
                      <Link to="/dashboard">Dashboard</Link>
                    </LinkStyle>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <LinkStyle>
                      <Link to="/profile">Profile</Link>
                    </LinkStyle>
                  </MenuItem>
                </>
              )}
              {!auth ? (
                <>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <LinkStyle>
                      <Link to="/login">Login</Link>
                    </LinkStyle>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <LinkStyle>
                      <Link to="/register">Register</Link>
                    </LinkStyle>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#ccc",
                        color: "#fff",
                      }}
                      to="/logout"
                      onClick={() => {
                        dispatch(authAction.logoutUser())
                          .then(async (result) => {
                            console.log("result:", result);
                            //PURGE post step vars:
                            localStorage.removeItem("forteworksToken");
                            dispatch(postAction.clearPost())
                              .then(async (result) => {
                                console.log(
                                  "logout and cancel to purge post vars: result:",
                                  result
                                );
                              })
                              .catch((err) => console.log(err));
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      <LinkStyle
                        style={{
                          textDecoration: "none",
                          backgroundColor: "#ccc",
                          color: "#fff",
                        }}
                      >
                        Logout
                      </LinkStyle>
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
            <h3>SERVEWERX.COM</h3>
          
        </Grid>
      </Toolbar>
      
          <Route exact path="/" component={Home} />
            <Route exact path="/build" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/allSitePosts" component={AllSitePostsPage} />
            <Route path="/logout" component={Home} />
      </Router>

       

    </div>
  );
}
