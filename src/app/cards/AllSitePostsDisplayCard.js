import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../App.css";
import { config } from "../../Constants";
// import GeoLocatorByZip from "../components/GeoLocatorByZip";


const AllSitePostsDisplayCard = (props) => {
  const IMG_URL = config.url.IMG_URL;
  var auth = useSelector((state) => state.auth.authorized);
  var user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.post.categories);

  const [currentCategory, setCurrentCategory] = useState("");
  const [seeDetails, setSeeDetails] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  
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
   let sp = "/"
    if (typeof isoStringDate === "undefined") {
        sp = "/";
    }
    //let today = new Date();
    let currentDate  = new Date(isoStringDate);
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth() + 1; //As January is 0.
    var yyyy = currentDate.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '' + mm;
    return (mm + sp + dd + sp + yyyy);

}
  

   

  console.log("inProgress:", inProgress);
  useEffect(() => {
    setInProgress(inProgress);
  }, [inProgress]);

  useEffect(() => {
    setCurrentCategory(categories[parseInt(props.post.category)]);
  }, []);

  return (
    <>
      <Grid container direction="row" className="cardCard">
        <Grid item xs={12} sm={6} style={{textAlign:"left"}}>
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

          <p className="cardCategory">{currentCategory} </p>
        </Grid>
        <Grid item xs={12} sm={6}   >
          <img
            src={`${IMG_URL}/` + props.post.postImage} //+ props.props.post.postImage
            alt="img"
            className="cardImg"
          />
        </Grid>
        <Grid item xs={12} sm={12}  >
          {seeDetails && (
            <>
            <Grid container direction="row" alignItems="center" justify="left" >
            <Grid item xs={12} sm={6}  style={{textAlign:"left"}}>
                <div className="cardDescription">{props.post.description}</div>
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
                    href={`http://` + props.post.website}
                    className="appAnchor"
                    target="blank"
                  >
                    {`http://` + props.post.website}
                    <Icon className="cardIcon">web</Icon>
                  </a>
                </div>
                <div className="cardContactInfo">{props.post.zip}</div>
                <div className="cardContactInfo">
                   {formatIsoStringDate(props.post.dateCreated)} 
                  
                </div> 
              
              </Grid>
              <Grid item xs={12}  sm={6} style={{ minHeight:"200px"}} >
                  {/* <GeoLocatorByZip zip={props.post.zip}></GeoLocatorByZip>   */}
              </Grid>

            </Grid>
            
            </>
          )}
        </Grid>
       
       
        <Grid item xs={12} sm={12}  >
          <button
            onClick={() => {
              setSeeDetails(!seeDetails);
            }}
          >
            {seeDetails ? "hide" : "more..."}
          </button>
        </Grid>
      </Grid>
      <p className="cardDevNote">AllSitePostsDisplayCard</p>
    </>
  );
};

export default AllSitePostsDisplayCard;
