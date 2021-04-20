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
  font-size: .9em
  border-radius: 10px !important;
  opacity: 0.8;
`;

export default function NavigationMenu() {
  var auth = useSelector((state) => state.auth.authorized);
  const [user, setUser] = useState({});
  const [redirect,setRedirect] = useState(null)
  
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




 

  const goToBrowse = () => {
    console.log('function goToBrowse() ... ')
   
     
   
  

    
  }

  return (
    <div>
      <Router>
        <Toolbar
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            zIndex: "101",
            background: "#fff",
          }}
        >
          <Grid container spacing={1}>
            <Grid item sm={1}>
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
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "#222" }}
                    >
                      Home
                    </Link>
                  </LinkStyle>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <LinkStyle>
                    <Link
                      to="/allSitePosts"
                      style={{ textDecoration: "none", color: "#222" }}
                    >
                      Browse
                    </Link>
                  </LinkStyle>
                </MenuItem>
                {auth && (
                  <>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <LinkStyle>
                        <Link
                          to="/dashboard"
                          style={{ textDecoration: "none", color: "#222" }}
                        >
                          My Dashboard
                        </Link>
                      </LinkStyle>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <LinkStyle>
                        <Link
                          to="/profile"
                          style={{ textDecoration: "none", color: "#222" }}
                        >
                          My Profile
                        </Link>
                      </LinkStyle>
                    </MenuItem>
                  </>
                )}
                {!auth ? (
                  <>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <LinkStyle>
                        <Link
                          to="/login"
                          style={{ textDecoration: "none", color: "#222" }}
                        >
                          Login
                        </Link>
                      </LinkStyle>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <LinkStyle>
                        <Link
                          to="/register"
                          style={{ textDecoration: "none", color: "#222" }}
                        >
                          Register
                        </Link>
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
            </Grid>
            <Grid item sm={3} xs={8}>
              <h3>SERVEWERX.COM</h3>
            </Grid>
            <Grid item sm={8} xs={2}  >
              <Grid container alignItems="center" justify="center">
                <Grid
                  item
                >
                  <h4><Link
                    to="/allSitePosts"
                    style={{ textDecoration: "none", color: "#222" }}
                  >
                    Browse
                  </Link></h4>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>

        <Route exact path="/" render={(props) => <Home {...props} browse={goToBrowse} title={`Props through render`} />} />

        {/* <Route exact path="/" component={Home} />
        <Route exact path="/build" component={Home}  /> */}
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

/*

3.1. withRouter
withRouter is a function provided in the react-router-dom library that helps us access the history prop in components which are not immediate children to the <Route> components.
To import withRouter
import { withRouter } from "react-router-dom";
Now to get the history prop inside our component, we need to wrap our component with withRouter while exporting it.
export default withRouter(yourComponent);
We can now access the history prop same as above to do our required navigations.

*/