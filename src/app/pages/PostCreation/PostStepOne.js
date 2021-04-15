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
`;

const PostStepOne = () => {
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  var post = useSelector((state) => state.post);
console.log("Post Step One: post:",post)
  const dispatch = useDispatch();

  useEffect( () => {
//dispatch to post zero
dispatch(postAction.initPost()).catch((err) => console.error(err))
    console.log("init zero ... ")
  },[post.postStepZero])

  return (
    <>
     
      

      {post.postStepZero &&
      
      <Router>
        <Grid item xs={12} sm={12}>
            <PostCreateCard></PostCreateCard>
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
 