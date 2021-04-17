import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
// import forteworks.com from "../components/forteworks.com";
import "../../App.css";
import { config } from "../../Constants";
import * as postAction from "../../redux/actions/postAction";

const HOST_URL = config.url.HOST_URL;

const formSchema = yup.object({
  title: yup.string().required().min(3),
  email: yup.string().email().required(),
  phone: yup.string().min(10),
});

const PostCreateCard = (props) => {
  const dispatch = useDispatch();
  const [seeDetails, setSeeDetails] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [submitComplete, setSumbitComplete] = useState(false);
  const [currentPost, setCurrentPost] = useState(false);

  var user = useSelector((state) => state.auth.user);
  var post = useSelector((state) => state.post);
  useEffect(() => {
    console.log("post data changed:", post);
  }, [post]);

  //console.log("STATE---------user:",user)
  useEffect(() => {
    setInProgress(inProgress);
  }, [inProgress]);
  var us_states = useSelector((state) => state.auth.usstates);
  var categories = useSelector((state) => state.post.categories);

  const initEdit = () => {
    console.log(". . . . . . . .init edit ");
    dispatch(postAction.setStatusBlue()).catch((err) => console.error(err));
    //setAllowEdit(!allowEdit);
    setSeeDetails(!seeDetails);
  };
  const closeEdit = () => {
    //setAllowEdit(!allowEdit);
    setSeeDetails(!seeDetails);
    dispatch(postAction.setStatusGreen()).catch((err) => console.error(err));
  };

  const post_types = ["select one", "looking for work", "looking to hire"];
  return (
    
     

     
        <React.Fragment>
        <>
       
          {!post.postStepOne && (
             <div className="card-plain">
            <Grid
              container
              spacing={1}
              align="center"
              justify="center"
              direction="row"
            >
              <Grid item xs={12}>
                {/* //FORM AND REDUX  part 3 JSX*/}
                <Formik
                  initialValues={{
                    userId: user.data._id,
                    title: "",
                    description: "",
                    postType: "",
                    category: "",
                    email: user.data.email,
                    phone: user.data.phone,
                    address: user.data.address,
                    city: user.data.city,
                    state: user.data.state,
                    zip: user.data.zip,
                    //postImage: user.data.profileImage
                  }}
                  // !PostImage REQUIRED here so as to not get deleted accidentally.
                  validationSchema={formSchema}
                  onSubmit={(values) => {
                    console.log("values:", values);
                    setInProgress(true);
                    setSeeDetails(!seeDetails);
                    dispatch(postAction.createPost(values))
                      .then(async (result) => {
                        console.log("create post result:", result); //good.
                        await setCurrentPost(result);
                        await setSumbitComplete(true);

                        dispatch(postAction.setStatusGreen()).catch((err) =>
                          console.error(err)
                        );
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  {(props) => (
                    <Grid container className="PostCreateCardForm">
                      <Grid item xs={12} sm={12}>
                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">Post Title</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            className="appInput"
                            placeholder="Post Title"
                            onChange={props.handleChange("title")}
                            value={props.values.title}
                            onBlur={props.handleBlur("title")}
                          />

                          <div style={{ color: "salmon" }}>
                            {props.touched.title && props.errors.title}
                          </div>
                        </Grid>

                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">postType</label>
                        </Grid>
                        <Grid item xs={12}>
                          <select
                            className="appSelect"
                            value={props.values.postType}
                            onChange={props.handleChange("postType")}
                          >
                            {post_types.map((item, index) => {
                              return (
                                <option key={index} value={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </Grid>

                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">Description</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            className="appInput"
                            placeholder="Description"
                            onChange={props.handleChange("description")}
                            value={props.values.description}
                            onBlur={props.handleBlur("description")}
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.description &&
                              props.errors.description}
                          </div>
                        </Grid>

                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">Category</label>
                        </Grid>
                        <Grid item xs={12}>
                          <select
                            value={props.values.category}
                            onChange={props.handleChange("category")}
                            className="appSelect"
                          >
                            {categories.map((item, index) => {
                              return (
                                <option key={index} value={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </Grid>

                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">Email</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            className="appInput"
                            placeholder="Email"
                            onChange={props.handleChange("email")}
                            value={props.values.email}
                            onBlur={props.handleBlur("email")}
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.email && props.errors.email}
                          </div>
                        </Grid>
                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">Phone</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            className="appInput"
                            placeholder="Phone"
                            onChange={props.handleChange("phone")}
                            value={props.values.phone}
                            onBlur={props.handleBlur("phone")}
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.phone && props.errors.phone}
                          </div>
                        </Grid>
                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">Address</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            className="appInput"
                            placeholder="Address"
                            onChange={props.handleChange("address")}
                            value={props.values.address}
                            onBlur={props.handleBlur("address")}
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.address && props.errors.address}
                          </div>
                        </Grid>
                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">City</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            className="appInput"
                            placeholder="City"
                            onChange={props.handleChange("city")}
                            value={props.values.city}
                            onBlur={props.handleBlur("city")}
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.city && props.errors.city}
                          </div>
                        </Grid>
                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">State</label>
                        </Grid>
                        <Grid item xs={12}>
                          <select
                            value={props.values.state}
                            onChange={props.handleChange("state")}
                            className="appSelect"
                          >
                            {us_states.map((item, index) => {
                              return (
                                <option key={index} value={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </Grid>
                        <Grid item xs={12} className="cardLabelContainer">
                          <label className="cardLabel">Zip</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                            className="appInput"
                            placeholder="Zip"
                            onChange={props.handleChange("zip")}
                            value={props.values.zip}
                            onBlur={props.handleBlur("zip")}
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.zip && props.errors.zip}
                          </div>
                        </Grid>
                        {/* <input
                             type="hidden"
                            onChange={()=>{}}
                            value={props.values.postImage}
                            disabled
                          /> */}
                        <input
                          type="hidden"
                          onChange={() => {}}
                          value={user._id}
                          disabled
                        />

                        {/* UPLOAD AN IMAGE: https://www.youtube.com/watch?v=SAUvlkTDMM4 */}
                        <Grid item xs={12}>
                          <button onClick={props.handleSubmit}>Create</button>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Formik>

                {/* //end  part 3*/}
              </Grid>
              <p className="appDevNote">PostCreateCard</p>
            </Grid>
            </div>
          )}
         
           </>
        </React.Fragment>
     

       
     
    
  );
};

export default PostCreateCard;
