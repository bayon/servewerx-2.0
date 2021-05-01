//THANKS TO: https://stackoverflow.com/questions/65176026/uploading-image-from-react-frontend-to-express-backend-and-displaying-it-back-in
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import { config } from "../../Constants";
import * as postAction from "../../redux/actions/postAction";

/*
TO GO: SPINNER: 
deps:
import FadeLoader from "react-spinners/FadeLoader";

fn:
let [loading, setLoading] = useState(false);
let [color, setColor] = useState("red");

jsx:
<div style={{position:"absolute",bottom:"25%",left:"50%"}} >
<FadeLoader color={"red"} loading={loading}  size={1} height={4} width={2}   />
</div>
*/

const PostImageForm = (props) => {



  let [loading, setLoading] = useState(false);
const [fileSize,setFileSize] = useState(0);
  
  const dispatch = useDispatch();
   console.log("PostImageForm PROPS: ", props);



  const [file, setFile] = useState(null);
  // const [imgFile, setImgFile] = useState(null);
  //const [id, setId] = useState(props.props.user._id);
  var user = useSelector((state) => state.auth.user);
  const handleFileChange = (event) => {
    setFile(event.target.files);
    let file_size = event.target.files[0].size;
    //or if you like to have name and type
    let file_name = event.target.files[0].name;
    let file_type = event.target.files[0].type;

    if(event.target.files[0].size > 1000000){
      alert('file size exceeds 1 MB')
      //event.target.files.filter(file => file.size <= 1000000);
    }
    setFileSize(file_size)
    console.log('file_name:file_type:file_size:',file_name,":",file_type,":",file_size)
    console.log(file);
  };

   

  const API_URL = config.url.API_URL;
  const IMG_URL = config.url.IMG_URL;

  const submitWithNoImage = async (event) => {
    event.preventDefault();
    setLoading(true)
    const currentPost = props.props.post.data;
    currentPost.postImage = "default";
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
        setLoading(false);
        //props.props.refresh();
        

      })
      .catch((err) => console.log(err));

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (!file) {
      return false;
    }
    if(fileSize > 1000000){
      alert('Choose a file less than 1 MB.')
      setLoading(false);
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
          setLoading(false);
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
      <div style={{position:"absolute",bottom:"25%",left:"50%"}} >
<FadeLoader color={"red"} loading={loading}  size={1} height={4} width={2}   />
</div>
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
          <p>Max Image Size: 1 MB</p>
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Save and Continue
          </button>
          <button className="btn btn-primary mt-3" onClick={submitWithNoImage}>
            No Image and Continue
          </button>
          
        </Grid>
      </form>
      <p className="cardDevNote" >PostImageForm</p>

    </Grid>
  );
};

export default PostImageForm;
