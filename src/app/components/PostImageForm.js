//THANKS TO: https://stackoverflow.com/questions/65176026/uploading-image-from-react-frontend-to-express-backend-and-displaying-it-back-in
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../Constants";
import * as postAction from "../../redux/actions/postAction";



const PostImageForm = (props) => {
  const dispatch = useDispatch();
   console.log("PostImageForm PROPS: ", props);



  const [file, setFile] = useState(null);
  // const [imgFile, setImgFile] = useState(null);
  //const [id, setId] = useState(props.props.user._id);
  var user = useSelector((state) => state.auth.user);
  const handleFileChange = (event) => {
    setFile(event.target.files);
    console.log(file);
  };

  const API_URL = config.url.API_URL;
  const IMG_URL = config.url.IMG_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      return false;
    }
    const data = new FormData();
    console.log('PROPS:',props);
    console.log('PROPS PROPS:',props.props);
    const currentPost = props.props.post.data; // AS OPPOSED TO : props.props.post.post ??? 
    data.append("id", currentPost.id);//props.props 2x UNDEFINED ? id vs _id 
    
    //POST IMAGE FORM 
   // TROUBLE SHOOTING HERE: WHY? is there a props.props.post.post SOMETIMES and a props.props.post.data OTHERTIMES ? 
   /// FIX THIS SHOULD BE THE SOLUTION... had not implemented the updateCreatingPost yet...see if it helps. 
   
    for (var x = 0; x < file.length; x++) {
      data.append("file", file[x]);
    }
    console.log("DATA getting sent to API: data:",data)
    //NOT USING THE REDUX ACTIONS AND REDUCERS: 
    axios.post(`${API_URL}/uploadPostImage`, data).then((res) => {
      console.log('post image upload results: ',res)
      const postImage = res.data;
      currentPost.postImage = postImage;
      // const values = user.data;
      const values = currentPost
      console.log('values to update the post with...',values)
      dispatch(postAction.updateCreatingPost(values))
        .then(async (result) => {
          console.log('update post result:',result)
          if (result.success) {
            //code
            console.log('success response ')

          }
          console.log('success or fail dispatch response ?! ')
          //props.props.refresh();
        })
        .catch((err) => console.log(err));
    });
  };
  // {!props.props.post && 
  //   return(
  //   <p>add an image after you create your post.</p>
  //   )
  // }
  
  return (
    
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
    >
      <form name="fileinfo" encType="multipart/form-data">
        <Grid xs={12}>
        

          {/* {props.props.post &&
            <img
              src={`${IMG_URL}/` + props.props.post.postImage}
              alt="img"
              style={{ height: "200px", width: "auto", borderRadius: "15px" }}
            />
          } */}
        </Grid>

        <Grid xs={12}>
          <input
            name="postImage"
            type="file"
            id="file"
            accept=".jpg , .png"
            multiple
            onChange={handleFileChange}
            style={{ outline: "none", border: "none" }}
          />
        </Grid>
        <Grid xs={12}>
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Save Image and Continue
          </button>
        </Grid>
      </form>
      <p className="cardDevNote" >PostImageForm</p>

    </Grid>
  );
};

export default PostImageForm;
