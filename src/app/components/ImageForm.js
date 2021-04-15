//THANKS TO: https://stackoverflow.com/questions/65176026/uploading-image-from-react-frontend-to-express-backend-and-displaying-it-back-in
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../Constants";
import * as authAction from "../../redux/actions/authAction";

const ImageForm = (props) => {
  const dispatch = useDispatch();
  console.log("PROPS: ", props);

  const [file, setFile] = useState(null);
  // const [imgFile, setImgFile] = useState(null);
  //const [id, setId] = useState(props.props.user._id);
  var user = useSelector((state) => state.auth.user);
  const handleFileChange = (event) => {
    setFile(event.target.files);
    console.log(file);
  };

  const API_URL = config.url.API_URL;
  const HOST_URL = config.url.HOST_URL;

  const handleSubmit = async (event) => {
   
    event.preventDefault();
    if (!file) {
      return false;
    }
    const data = new FormData();
    data.append("_id", props.props.user._id);
    for (var x = 0; x < file.length; x++) {
      data.append("file", file[x]);
    }
    //TODO: 
    // MAKE separate User and Post images. 
    // try to use multer code within a scope. 
    
    axios.post(`${API_URL}/uploadUserImage`, data).then((res) => {
      // setImgFile(`${HOST_URL}/public/images/` + res.data);
      const profileImage = res.data;
      user.data.profileImage = profileImage;
      const values = user.data;
      dispatch(authAction.updateUser(values))
        .then(async (result) => {
          if (result.success) {
            //code
          }
          props.props.refresh();
          props.close()
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <Grid
      container
      spacing={1}
      align="center"
      justify="center"
      direction="column"
      
       
    >
      <Grid item xs={12}>
      <form name="fileinfo" encType="multipart/form-data">
        <Grid item xs={12}  >
          {/* {imgFile && (
              
                <img
                  src={imgFile}
                  alt="img"
                  style={{
                    height: "100px",
                    width: "auto",
                    borderRadius: "15px",
                  }}
                />
              
            )}   */}

          {
            <img
              src={`${HOST_URL}/public/images/` + props.props.user.profileImage}
              alt="img"
              style={{ height: "200px", width: "auto", borderRadius: "15px" }}
            />
          }
        </Grid>

        <Grid item xs={12}>
          <input
            name="profileImage"
            type="file"
            id="file"
            accept=".jpg , .png"
            multiple
            onChange={handleFileChange}
            style={{ outline: "none", border: "none" }}
            
          />
        </Grid>
        <Grid item xs={12}>
          <button className="appButton" onClick={handleSubmit} style={{width:"90%"}}>
            Update Your Profile Image
          </button>
        </Grid>
      </form>
      <p className="cardDevNote" >ImageForm</p>
      </Grid>
    </Grid>
  );
};

export default ImageForm;
