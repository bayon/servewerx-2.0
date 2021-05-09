import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { config } from "../../Constants";
import * as postAction from "../../redux/actions/postAction";
import PayPage from '../pages/PayPage';

const stripePromise = loadStripe("pk_live_c03o8lC0VMl6y5eBpZ1eov45");

const CreatePostDisplayCard = (props) => {

  // const [seeDetails, setSeeDetails] = useState(false);
  const [readyToComplete, setAllowEdit] = useState(false);
   //const Kolor = useSelector((state) => state.post.statusColor);
  const dispatch = useDispatch();

  const [beginPay, setBeginPay] = useState(false);

  // const [inProgress, setInProgress] = useState(false);
  const IMG_URL = config.url.IMG_URL;
  var currentPost = {}
  //console.log("IMG_URL:", IMG_URL);
  var user = useSelector((state) => state.auth.user);

 try {
  console.log("CreatePostDisplayCard - props:", props); //good to here.
  currentPost = props.props.post.post
  
 } catch (error) {
   console.log('error:',error)
   return (
     <div>EPIC FAIL</div>
   )
 }

  //console.log("STATE---------user:", user);
  // useEffect(() => {
  //   setInProgress(inProgress);
  // }, [inProgress]); post.postStepThree && 

  const initEdit = () => {
    console.log('. . . . . . . .init edit ')
    dispatch(postAction.setStatusBlue()).catch((err) => console.error(err))
    setAllowEdit(!readyToComplete);
  }
  const closeEdit = () => {
    setAllowEdit(!readyToComplete);
    dispatch(postAction.setStatusGreen()).catch((err) => console.error(err))

  };

  return (
    <Grid container spacing={0}>
            

      <Grid item xs={12} sm={10}>
        {props.postStepThree && 
        
        <p className="cardTitle"> {currentPost && currentPost.title}</p>
        }
      </Grid>
      <Grid item xs={12} sm={2}>
       
      </Grid>
      {true &&   (
        <Grid item xs={12} sm={12} style={{ background: "#eee" }}>
          <Grid container spacing={0} direction="row">
            <Grid item sm={10}>
              {!readyToComplete && (
                <Grid
                  container
                  direction="row"
                  align="center"
                  justify="center"
                  className="cardDetailsContainer"
                   
                >

                  <Grid item xs={12} sm={8} style={{textAlign:"left",padding:"1em"}}>
                    <p className="cardTitle">{currentPost.title}</p>
                    <p className="cardDescription">{currentPost.description}</p>
                    <div className="cardContactInfo">
                      <a
                        href={"mailto:" + currentPost.email}
                        style={{ color: "#222", textDecoration: "none" }}
                      >
                        {currentPost.email}{" "}
                        <Icon className="cardIcon"  >email</Icon>
                      </a>
                    </div>

                    <div className="cardContactInfo">
                      <a
                        href={"tel:" + currentPost.phone}
                        style={{ color: "#222", textDecoration: "none" }}
                      >
                        {currentPost.phone}
                        <Icon className="cardIcon" >phone</Icon>
                      </a>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} className="cardImageGrid" >
                    <img
                      src={
                        `${IMG_URL}/` + currentPost.postImage
                      }  
                      alt="img"
                    className="cardImg"
                    />
                  </Grid>
                  <p className="appDevNote" >CreatePostDisplayCard</p>
                </Grid>
              )}
            </Grid>
            <Grid item sm={2}>
              {!readyToComplete && (
                  <>
                <button
                  onClick={() => {
                     //initEdit()
                     console.log("ACCEPT THE NEW POST")
                     setBeginPay(true)
                     //dispatch to new post action postAccepted
                     // set postStepone and postStepTwo back to false. call it good.

                     // DO NOT DISPATCH UNTIL POST IS PAID FOR://////////////////////////////////////////
                    //  dispatch(postAction.acceptPost(currentPost._id))
                    //  .then((res) => {
                    //    console.log('accept post result: res:',res)

                    //  })
                    //  .catch((err) => console.error(err))
                     ////////////////////////////////////////////////////////////////////////////////////

                  }}
                  style={{ color: "blue" }}
                >
                  ACCEPT
                </button>
                  <button
                  onClick={() => {
                     //initEdit()
                    
                     console.log("CANCEL THE NEW POST")
                      //dispatch to new post action postCanceled
                      dispatch(postAction.cancelPost(currentPost._id)).catch((err) => console.error(err))
                      // delete the post and remove the image. 
                      
                  }}
                  style={{ color: "blue" }}
                >
                  CANCEL
                </button>
                  </>


              )}
            </Grid>
          </Grid>
          {beginPay && (
            <>
             <Elements stripe={stripePromise}>
            <PayPage prop={props}  currentPost={currentPost}/>
          </Elements>
            </>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default CreatePostDisplayCard;
