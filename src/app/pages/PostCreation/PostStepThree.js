import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { config } from "../../../Constants";
import CreatePostDisplayCard from "../../cards/CreatePostDisplayCard";
 
const IMG_URL = config.url.IMG_URL;
const LinkStyle = styled.section`
  padding: 0.3em;
  height: 35px;
  background: green;
  color: #333;
`;

const PostStepThree = (props) => {

  //console.log('Post Step 3 props:',props)
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  var post = useSelector((state) => state.post);

  return (
    <>
        
      {
        post && 
        <CreatePostDisplayCard props={post}></CreatePostDisplayCard>
      }
     
      
    </>
  );
};

export default PostStepThree;
 