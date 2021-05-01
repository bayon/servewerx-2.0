import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import { config } from "../../../Constants";
import PostImageForm from "../../components/PostImageForm";
import PostStepThree from "./PostStepThree";

const IMG_URL = config.url.IMG_URL;
const LinkStyle = styled.section`
  padding: 0.3em;
  height: 35px;
 background: orange;
  color: #333;
  border-radius:10px;
  margin:15px;
`;

const PostStepTwo = () => {
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  var post = useSelector((state) => state.post);

  //get latest post

  return (
    <>

      {/* why?: to hide after step two is finished. */}
      {!post.postStepTwo && 
       <PostImageForm props={post}></PostImageForm>
      }
     


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
 
