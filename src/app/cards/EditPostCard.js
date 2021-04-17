import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import "../../App.css";
import * as postAction from "../../redux/actions/postAction";
import AreYouSureModal from "../components/AreYouSureModal";

const formSchema = yup.object({
  title: yup.string().required().min(3),
  email: yup.string().email().required(),
  phone: yup.string().min(10),
});

const EditPostCard = (props) => {
  console.log("EDIT POST CARD props:", props);
  const currentPost = props.data

  const Kolor = useSelector((state) => state.post.statusColor);

  useEffect(() => {
    dispatch(postAction.getStatusColor())
      .then(async () => {
        // result would be undefined
        console.log("NEW >>> hook status color:", Kolor);
        //setKolor(Kolor)
      })
      .catch((err) => console.log(err));
    /* Dependencies: 
        import * as statusAction from "../../redux/actions/statusAction";
        import { useDispatch, useSelector } from "react-redux";
        const Kolor = useSelector((state) => state.status.statusColor);
      */
  }, [Kolor]);

  /* currentPost.xxx
postType: "1"
city: "asdfasdf"
description: "will do anything"
email: "sdf@sdf.com"
phone: "1231231233"
postImage: ""
state: "5"
title: "Need Cash Now"
userId: "601a9e4d64d8aa0004c8c07b"
zip: "34555"
__v: 0
_id: "60730537d09d5d33501fc987"
   */

  const dispatch = useDispatch();
  const [seeDetails, setSeeDetails] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const [activated, setActivated] = useState(false);

  var user = useSelector((state) => state.auth.user);
  var us_states = useSelector((state) => state.auth.usstates);
  var categories = useSelector((state) => state.post.categories);

  console.log("STATE---------user:", user);
  useEffect(() => {
    setInProgress(inProgress);
  }, [inProgress]);

  const post_categories = ["select one", "looking for work", "looking to hire"];
  const activatedOptions = ["Set Activation", "activated", "deactivated"];
  console.log("EditPostCard.js props:", props);
  const deleteItem = () => {
    console.log("delete item ", currentPost._id);
    //call to a redux action.
    dispatch(postAction.deletePost(currentPost._id))
      .then(async (res) => {
        console.log("res:", res);
        dispatch(postAction.setStatusGreen()).catch((err) =>
          console.error(err)
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <React.Fragment>
        <Grid
          container
          spacing={0}
          // align="center"
          // justify="center"
          direction="row"
          className="cardGridContainer"
        >
          <Grid item xs={12} sm={10}  >
            {/* //FORM AND REDUX  part 3 JSX*/}
 
            <Formik
            style={{border:"solid 1px purple"}}
              initialValues={{
                id: currentPost._id,
                userId: currentPost.userId,
                title: currentPost.title,
                description: currentPost.description,
                category: currentPost.category,
                postType: currentPost.postType,
                email: currentPost.email,
                phone: currentPost.phone,
                address: currentPost.address,
                city: currentPost.city,
                state: currentPost.state,
                zip: currentPost.zip,
                postImage: currentPost.postImage,
                activated: currentPost.activated,
              }}
              // !PostImage REQUIRED here so as to not get deleted accidentally.
              validationSchema={formSchema}
              onSubmit={(values) => {
                console.log("values:", values);
                setInProgress(true);
                props.closeEdit();
                setSeeDetails(!seeDetails);
                dispatch(postAction.updatePost(values))
                  .then(async (result) => {
                    console.log("create post result:", result);
                    // seeDetails(false);
                    if (result.success) {
                      //setInProgress(true);
                      //seeDetails(false);
                    }
                    console.log(
                      "IT ALL STARTS HERE WITH REFRESH POSTS FOR USER."
                    );
                    dispatch(postAction.setStatusGreen()).catch((err) => console.error(err))
                    props.refresh(); //?
                  })
                  .catch((err) => console.log(err));
                 
              }}
            >
              {(props) => (
                <Grid container className="EditPostCardForm">
                  <Grid item xs={12} sm={12}   >
                    <Grid item xs={12}>
                      <input
                      className="cardInput"
                        placeholder="Post Title"
                        onChange={props.handleChange("title")}
                        value={props.values.title}
                        onBlur={props.handleBlur("title")}
                         
                      />

                      <div style={{ color: "salmon" }}>
                        {props.touched.title && props.errors.title}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <select
                        className="cardSelect"
                        value={props.values.postType}
                        onChange={props.handleChange("postType")}
                        style={{
                          border: "none",
                          outline: "none",
                          minWidth: "90px",
                        }}
                      >
                        {post_categories.map((item, index) => {
                          return (
                            <option key={index} value={index}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </Grid>

                    {/* <Grid item xs={12}>
                      <input
                        placeholder="Description"
                        onChange={props.handleChange("description")}
                        value={props.values.description}
                        onBlur={props.handleBlur("description")}
                      />
                      <div style={{ color: "salmon" }}>
                        {props.touched.description && props.errors.description}
                      </div>
                    </Grid> */}

                    <Grid item xs={12}>
                      <textarea
                        className="cardTextarea"
                        placeholder="Description"
                        onChange={props.handleChange("description")}
                        value={props.values.description}
                        onBlur={props.handleBlur("description")}
                      >
                        {props.values.description}
                      </textarea>
                      <div style={{ color: "salmon" }}>
                        {props.touched.description && props.errors.description}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <select
                        className="cardSelect"
                        value={props.values.category}
                        onChange={props.handleChange("category")}
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

                    <Grid item xs={12}>
                      <input
                       className="cardInput"
                        placeholder="Email"
                        onChange={props.handleChange("email")}
                        value={props.values.email}
                        onBlur={props.handleBlur("email")}
                      />
                      <div style={{ color: "salmon" }}>
                        {props.touched.email && props.errors.email}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <input
                       className="cardInput"
                        placeholder="Phone"
                        onChange={props.handleChange("phone")}
                        value={props.values.phone}
                        onBlur={props.handleBlur("phone")}
                      />
                      <div style={{ color: "salmon" }}>
                        {props.touched.phone && props.errors.phone}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <input
                       className="cardInput"
                        placeholder="Address"
                        onChange={props.handleChange("address")}
                        value={props.values.address}
                        onBlur={props.handleBlur("address")}
                      />
                      <div style={{ color: "salmon" }}>
                        {props.touched.address && props.errors.address}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <input
                       className="cardInput"
                        placeholder="City"
                        onChange={props.handleChange("city")}
                        value={props.values.city}
                        onBlur={props.handleBlur("city")}
                      />
                      <div style={{ color: "salmon" }}>
                        {props.touched.city && props.errors.city}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <select
                        className="cardSelect"
                        value={props.values.state}
                        onChange={props.handleChange("state")}
                        style={{
                          border: "none",
                          outline: "none",
                          minWidth: "90px",
                        }}
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

                    <Grid item xs={12}>
                      <input
                       className="cardInput"
                        placeholder="Zip"
                        onChange={props.handleChange("zip")}
                        value={props.values.zip}
                        onBlur={props.handleBlur("zip")}
                      />
                      <div style={{ color: "salmon" }}>
                        {props.touched.zip && props.errors.zip}
                      </div>
                    </Grid>
                    <input
                      type="hidden"
                      onChange={() => {}}
                      value={props.values.postImage}
                      disabled
                    />
                    <input
                      type="hidden"
                      onChange={() => {}}
                      value={user._id}
                      disabled
                    />

                    <Grid item xs={12} sm={4}>
                      <div>
                        <label className="cardLabel" htmlFor="activationStatus">
                          Status:
                        </label>

                        <select
                          name="activationStatus"
                          className="cardSelect"
                          value={props.values.activated}
                          onChange={props.handleChange("activated")}
                        >
                          {activatedOptions.map((item, index) => {
                            return (
                              <option key={index} value={index}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                        <p style={{ fontSize: ".6em" }}>
                          Will not be seen if deactivated.
                        </p>
                      </div>
                    </Grid>

                    {/* UPLOAD AN IMAGE: https://www.youtube.com/watch?v=SAUvlkTDMM4 */}
                    <Grid container direction="row">
                      <Grid item xs={12} sm={4}>
                        <button
                         className="cardButton"
                          onClick={props.handleSubmit}
                          style={{ color: "green" }}
                        >
                          Update
                        </button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <AreYouSureModal
                          data={props.values}
                          deleteItem={deleteItem}
                        ></AreYouSureModal>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Formik>

            {/* //end  part 3*/}
          </Grid>
          <Grid item xs={12} sm={1}>
            <button  className="cardButton" onClick={props.closeEdit} style={{ color: "orange" }}>
              cancel
            </button>
          </Grid>
        </Grid>
        <p className="cardDevNote">EditPostCard</p>
      </React.Fragment>
    </>
  );
};

export default EditPostCard;
