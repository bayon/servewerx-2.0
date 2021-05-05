import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import "../../App.css";
import { config } from "../../Constants";

const AllSitePostsDisplayCard = (props) => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("red");

  var us_states = useSelector((state) => state.auth.usstates);
  const IMG_URL = config.url.IMG_URL;
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.post.categories);

  const [currentCategory, setCurrentCategory] = useState("");
  const [seeDetails, setSeeDetails] = useState(false);
  const [seeMap, setSeeMap] = useState(false);

  const [inProgress, setInProgress] = useState(false);

  //SET DEFAULT IMAGE IF NON EXISTS.
  if (props.post.postImage == "default") {
    props.post.postImage = "servewerx_level_scale-1.0-h100.png";
  }
  // const  convertDateToReadableString = (date) => {
  //   if (!date) return
  //   const d = new Date(date.replace('-', '/'))
  //   return d.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   })
  // }
  /**/
  const formatIsoStringDate = (isoStringDate) => {
    let sp = "/";
    if (typeof isoStringDate === "undefined") {
      sp = "/";
    }
    //let today = new Date();
    let currentDate = new Date(isoStringDate);
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth() + 1; //As January is 0.
    var yyyy = currentDate.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "" + mm;
    return mm + sp + dd + sp + yyyy;
  };

  const handleMapLoadSpinner = () => {
    console.log("handle map load spinner ");
    setLoading(false);
  };

  console.log("inProgress:", inProgress);
  useEffect(() => {
    setInProgress(inProgress);
  }, [inProgress]);

  useEffect(() => {
    setCurrentCategory(categories[parseInt(props.post.category)]);
  }, []);

  // const cleanUpMapBecauseUncontrolledOverlay = () => {
  //   if(seeMap){
  //     setSeeMap(false);
  //     setSeeDetails(false);
  //   }

  // }
  return (
    <>
      <Grid container direction="row" className="cardCard">
        <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
          <p className="cardTitle">{props.post.title}</p>

          {props.post.postType === "1" && (
            <p classname="cardPostType">"Looking For Work" </p>
          )}
          {props.post.postType === "2" && (
            <p classname="cardPostType">"Hiring" </p>
          )}
          {props.post.postType === "3" && (
            <p classname="cardPostType">"Open For Business" </p>
          )}

          <p className="cardCategory">{props.post.category} </p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={`${IMG_URL}/` + props.post.postImage} //+ props.props.post.postImage
            alt="img"
            className="cardImg"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid>
            <button
              onClick={() => {
                setSeeDetails(!seeDetails);
              }}
              style={{ cursor: "pointer" }}
            >
              {seeDetails ? "less..." : "more..."}
            </button>
          </Grid>
          {seeDetails && (
            <>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="left"
              >
                <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                  <div className="cardDescription">
                    {props.post.description}
                  </div>
                  <div className="cardContactInfo">
                    <a
                      href={"mailto:" + props.post.email}
                      style={{ color: "#222", textDecoration: "none" }}
                    >
                      {props.post.email} <Icon className="cardIcon">email</Icon>
                    </a>
                  </div>

                  <div className="cardContactInfo">
                    <a
                      href={"tel:" + props.post.phone}
                      style={{ color: "#222", textDecoration: "none" }}
                    >
                      {props.post.phone}
                      <Icon className="cardIcon">phone</Icon>
                    </a>
                  </div>
                  <div className="cardContactInfo">
                    <a
                      href={props.post.website}
                      className="appAnchor"
                      target="blank"
                    >
                      {props.post.website}
                      <Icon className="cardIcon">web</Icon>
                    </a>
                  </div>
                  <div className="cardContactInfo">{props.post.city} ,{us_states[parseInt(props.post.state)]} &nbsp;{props.post.zip}  </div>
                  
                  <div className="cardContactInfo">
                    {formatIsoStringDate(props.post.dateCreated)}
                  </div>
                </Grid>

                {/* <Grid container justify="left">
                  <Grid>
                    {seeDetails && (
                      <button
                        onClick={() => {
                          setSeeMap(!seeMap);
                          // setLoading(!loading);
                          if (!seeMap) {
                            setLoading(true);
                          } else {
                            setLoading(false);
                          }
                          console.log("SETTING L O A D I N G !!!!! ");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        map
                      </button>
                    )}
                    {loading && <p>...loading...</p>}
                  </Grid>
                </Grid> */}

                {/* 
                npm package zipcodes !? 
                <Grid
                  item
                  xs={12}
                 
                  style={{ overflow: "hidden !important" }}
                >
                  {seeMap && (
                    <Grid
                      item
                      xs={12}
                      style={{
                        
                        padding: "0 0 0 0",
                        height:"500px",
                        marginLeft:"3vw"
                      }}
                    >
                      <GeoLocatorByZip
                        zip={props.post.zip}
                        callback={handleMapLoadSpinner}
                      ></GeoLocatorByZip>
                    </Grid>
                  )}
                </Grid> */}
              </Grid>
            </>
          )}
        </Grid>
        <div >
          <FadeLoader
            color={color}
            loading={loading}
            size={1}
            height={4}
            width={2}
          />
        </div>
      </Grid>
      <p className="appDevNote">AllSitePostsDisplayCard</p>
    </>
  );
};

export default AllSitePostsDisplayCard;

/*
TO GO: SPINNER: 
deps:
import FadeLoader from "react-spinners/FadeLoader";

fn:
let [loading, setLoading] = useState(false);
let [color, setColor] = useState("red");

jsx:
<div style={{position:"absolute",bottom:"25%",left:"50%"}} >
<FadeLoader color={color} loading={loading}  size={1} height={4} width={2}   />
</div>
*/
