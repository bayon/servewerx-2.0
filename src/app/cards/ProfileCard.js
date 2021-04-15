import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import * as authAction from "../../redux/actions/authAction";
import ImageForm from "../components/ImageForm";
import "./card.css";

const formSchema = yup.object({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  phone: yup.string().min(10),
});

const ProfileCard = (props) => {
   
  const dispatch = useDispatch();
  const [seeDetails, setSeeDetails] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setInProgress(inProgress);
  }, [inProgress]);
  var us_states = useSelector( (state) => state.auth.usstates)
  const close = () => {
    setSeeDetails(!seeDetails);
  }
 
  return (
    <div className="card-plain">

      <Grid container spacing={0} direction="row"  >
        <Grid item xs={12} sm={9}  >
          <Typography variant="h5" component="h2">
            {props.user.fullName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}  >
          <button
            onClick={() => {
              setSeeDetails(!seeDetails);
            }}
          >
            {seeDetails ? "hide" : "edit"}
          </button>
        </Grid>
      </Grid>

      {seeDetails && (
        <>
          <React.Fragment>
            <Grid
              container
              spacing={0}
              align="center"
              justify="center"
              direction="row"
               
            >
              <Grid item xs={12} sm={5} >
                <ImageForm props={props} close={close}></ImageForm>
              </Grid>
              <Grid item xs={12} sm={5}>
                {/* //FORM AND REDUX  part 3 JSX*/}
                <Formik
                  initialValues={{
                    fullName: props.user.fullName,
                    email: props.user.email,
                    phone: props.user.phone,
                    address: props.user.address,
                    city: props.user.city,
                    state: props.user.state,
                    zip: props.user.zip,
                    profileImage: props.user.profileImage,
                    website: props.user.website,
                    created: props.user.created,
                    lastUpdated: props.user.lastUpdated
                  }}
                  validationSchema={formSchema}
                  onSubmit={(values) => {
                    console.log("values:", values);
                    setInProgress(true);
                     dispatch(authAction.updateUser(values))
                      .then(async (result) => {
                        console.log("update result:", result);

                        if (result.success) {
                          setInProgress(true);
                        }
                        props.refresh();
                        setSeeDetails(!seeDetails)
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  {(props) => (
                    <Grid container spacing={2} className="ProfileCardForm" 
                    align="center"
                    justify="center"
                    >
                      <Grid item xs={12} sm={12} >
                        <Grid item xs={12} sm={6}>
                          <label>Ful Name</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                          className="appInput"
                            placeholder="Full Name"
                            onChange={props.handleChange("fullName")}
                            value={props.values.fullName}
                            onBlur={props.handleBlur("fullName")}
                          />

                          <div style={{ color: "salmon" }}>
                            {props.touched.fullName && props.errors.fullName}
                          </div>
                        </Grid>

                        <Grid item xs={12}>
                          <label>Email</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                          className="appInput"
                            placeholder="Email"
                            onChange={props.handleChange("email")}
                            value={props.values.email}
                            onBlur={props.handleBlur("email")}
                            disabled
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.email && props.errors.email}
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <label>Phone</label>
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
                        <Grid item xs={12}>
                          <label>Address</label>
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
                        <Grid item xs={12}>
                          <label>City</label>
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
                        <Grid item xs={12}>
                          <label>State</label>
                        </Grid>
                        <Grid item xs={12}>
                        <select value={props.values.state} onChange={props.handleChange("state")} className="appSelect"  >
                            
                            {
                              us_states.map( (item,index ) => {
                                return(
                                  <option key={index} value={index}  >{item}</option>
                                )
                              })
                            }
                          </select>
                        </Grid>
                        <Grid item xs={12}>
                          <label>Zip</label>
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
                        <Grid item xs={12}>
                          <label>Website</label>
                        </Grid>
                        <Grid item xs={12}>
                          <input
                          className="appInput"
                            placeholder="Website"
                            onChange={props.handleChange("website")}
                            value={props.values.website}
                            onBlur={props.handleBlur("website")}
                          />
                          <div style={{ color: "salmon" }}>
                            {props.touched.website && props.errors.website}
                          </div>
                        </Grid>
                        <input
                            type="hidden"
                            onChange={()=>{}}
                            value={props.values.profileImage}
                            disabled
                          />
                        

                        {/* UPLOAD AN IMAGE: https://www.youtube.com/watch?v=SAUvlkTDMM4 */}
                        <Grid item xs={12}>
                          <button onClick={props.handleSubmit}>Update</button>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Formik>

                {/* //end  part 3*/}
              </Grid>
            </Grid>
          </React.Fragment>
        </>
      )}
                  <p className="cardDevNote" >ProfileCard</p>

    </div>
  );
};

export default ProfileCard;
