import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import "../../App.css";
import { config } from "../../Constants";
import * as postAction from "../../redux/actions/postAction";
import StatusChecker from "../components/StatusChecker";
import PostStepOne from "./PostCreation/PostStepOne";
import UsersPostsPage from "./UsersPostsPage";

/*
TO GO: 
import { useDispatch, useSelector } from "react-redux";

  var post = useSelector((state) => state.post);


*/
const IMG_URL = config.url.IMG_URL;

const LinkStyle = styled.section`
  padding: 0.3em;
  height: 35px;
  background: orange;
  color: #333;
  border-radius:10px;
  margin:15px;
`;

export default function DashboardPage(props) {

  const dispatch = useDispatch();
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  var haveUser = useSelector((state) => state.auth.haveUser);
  var post = useSelector((state) => state.post);
  const [editingPost, setEditingPost] = useState(false)
  console.log("post:",post)
  if (!auth) {
    return <div>not authorized.</div>;
  }

  const initPostCreation = () => {
    dispatch(postAction.initPost()).catch((err) => console.error(err))
  }
  
  return (
    <React.Fragment>
      <Grid container className="main-component-container">
        <Grid container alignItems="center" justify="center">
          <Grid item xs={8} className="pageTitle ">
            <h1 className="trim">Dashboard</h1>
            <StatusChecker></StatusChecker>
          </Grid>

          {haveUser && (
            <>
              <Grid item sm={2} className="pageGreeting">
                <h3 className="trim" >Hello,</h3> <p className="trim">{user.data.fullName}</p>
              </Grid>
              <Grid item sm={2} className="pageGreeting">
                <img
                  src={`${IMG_URL}/` + user.data.profileImage} //+ props.props.post.postImage
                  alt="img"
                  style={{
                    height: "100px",
                    width: "auto",
                    borderRadius: "15px",
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            {/* <PostCreatePage></PostCreatePage> */}

            <Router>
              <Grid item xs={12} sm={12}>
                <h3>Create A Post</h3>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/postStepOne"
                  onClick={initPostCreation}
                  // dispatch(postAction.initPost()).catch((err) => console.error(err))
                >
                  <LinkStyle>Step 1</LinkStyle>
                </Link>
              </Grid>
              <Route path="/postStepOne" component={PostStepOne} />
            </Router>
          </Grid>
          <Grid item xs={12} sm={6}>
             {post.postStepsAvailable &&
              <UsersPostsPage></UsersPostsPage>
             }
            
            
           
          </Grid>
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
