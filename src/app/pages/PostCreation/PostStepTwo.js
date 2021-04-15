import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import { config } from "../../../Constants";
import PostImageForm from "../../components/PostImageForm";
import PostStepThree from "./PostStepThree";

const HOST_URL = config.url.HOST_URL;
const LinkStyle = styled.section`
  padding: 0.3em;
  height: 35px;
  background: blue;
  color: #333;
`;

const PostStepTwo = () => {
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  var post = useSelector((state) => state.post);

  //get latest post

  return (
    <>
      <PostImageForm props={post}></PostImageForm>
      {post.postStepTwo &&
      <Router>
        <Grid item xs={12} sm={12}>
          {/* props={currentPost} */}
         
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/postStepThree"
          >
            <LinkStyle>Step 3</LinkStyle>
          </Link>
        </Grid>

        <Route path="/postStepThree" component={PostStepThree} post={post} />
      </Router>
}
    </>
  );
};

export default PostStepTwo;
/*
TO GO: 
import PostImageForm from "../components/PostImageForm";

 <PostImageForm props={currentPost}></PostImageForm>

*/
