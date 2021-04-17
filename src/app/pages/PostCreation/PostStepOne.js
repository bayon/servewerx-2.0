import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import { config } from "../../../Constants";
import * as postAction from "../../../redux/actions/postAction";
import PostCreateCard from "../../cards/PostCreateCard";
import PostStepTwo from "./PostStepTwo";
const HOST_URL = config.url.HOST_URL;

const LinkStyle = styled.section`
  padding: 0.3em;
  height: 35px;
  background: orange;
  color: #333;
  border-radius:10px;
  margin:15px;
`;

const PostStepOne = () => {
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  var post = useSelector((state) => state.post);
// console.log("Post Step One: post:",post)
  const dispatch = useDispatch();


useEffect( () => {
  //just do it once.
     // dispatch(postAction.initPost()).catch((err) => console.error(err))
    

      // why?:to set step ZERO = true
      dispatch(postAction.setStatusBlue()).catch((err) => console.error(err))
      // why?: to set BLUE
    },[])
    // maybe just once initially? post.postStepsAvailable

    var post = useSelector((state) => state.post);
   // console.log("Post Step One: post:",post)
    
  return (
    <>
     
      {post.postStepZero && !post.postStepTwo &&
       <PostCreateCard></PostCreateCard>
      }

      {post.postStepOne &&
      // why?: to show after step one is completed. 
      <Router>
        <Grid item xs={12} sm={12}>
            
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/postStepTwo"
          >
            <LinkStyle>Step 2</LinkStyle>
          </Link>

        </Grid>

        <Route path="/postStepTwo" component={PostStepTwo}  />
      </Router>
    }
    </>
  );
};

export default PostStepOne;
 