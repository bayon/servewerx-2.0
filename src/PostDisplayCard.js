import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { config } from "../../Constants";
import * as postAction from "../../redux/actions/postAction";
import EditPostCard from "./EditPostCard";

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

const PostDisplayCard = (props) => {
  const [seeDetails, setSeeDetails] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  //const Kolor = useSelector((state) => state.post.statusColor);
  const dispatch = useDispatch();

  // const [inProgress, setInProgress] = useState(false);
  const IMG_URL = config.url.IMG_URL;
  console.log("PostDisplayCard - props:", props); //good to here.

  var user = useSelector((state) => state.auth.user);
  //console.log("STATE---------user:", user);
  // useEffect(() => {
  //   setInProgress(inProgress);
  // }, [inProgress]);

  const initEdit = () => {
    console.log(". . . . . . . .init edit ");
    dispatch(postAction.setStatusBlue()).catch((err) => console.error(err));
    setAllowEdit(!allowEdit);
  };
  const closeEdit = () => {
    setAllowEdit(!allowEdit);
    dispatch(postAction.setStatusGreen()).catch((err) => console.error(err));
  };

  if (props.post.postImage == "default") {
    props.post.postImage = "servewerx_your_biz_card_here.png";//servewerx_level_scale-1.0-h100.png
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={10}>
        <p className="cardTitle"> {props.post.title}</p>
      </Grid>
      <Grid item xs={12} sm={2}>
        <button
          onClick={() => {
            setSeeDetails(!seeDetails);
          }}
        >
          {seeDetails ? "close" : "details"}
        </button>
      </Grid>
      {seeDetails && (
        <Grid item xs={12} sm={12} style={{ background: "#eee" }}>
          <Grid container spacing={0} direction="row">
            <Grid item sm={10}>
              {!allowEdit && (
                <Grid
                  container
                  direction="row"
                  align="center"
                  justify="center"
                  className="cardDetailsContainer"
                >
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    style={{ textAlign: "left", padding: "1em" }}
                  >
                    <p className="cardTitle">{props.post.title}</p>
                    <p className="cardDescription">{props.post.description}</p>
                    <div className="cardContactInfo">
                      <a
                        href={"mailto:" + props.post.email}
                        style={{ color: "#222", textDecoration: "none" }}
                      >
                        {props.post.email}{" "}
                        <Icon className="cardIcon">email</Icon>
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
                      <p>
                        Date Created:
                        {formatIsoStringDate(props.post.dateCreated)}
                      </p>
                      {/* <p>Activated:{props.post.activated ? ("YES") : ("NO")}</p> */}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} className="cardImageGrid">
                    <img
                      src={`${IMG_URL}/` + props.post.postImage} //+ props.props.post.postImage
                      alt="img"
                      className="cardImg"
                    />

                    {/* {
                      props.post.postImage ? 
                      ( <img
                        src={
                          `${IMG_URL}/` + props.post.postImage
                        } //+ props.props.post.postImage
                        alt="img"
                      className="cardImg"
                      />)
                      :
                      ( <img
                        src={
                          `https://servewerx-space-1.nyc3.digitaloceanspaces.com/servewerx_level_scale-1.0-h100.png` 
                        } //+ props.props.post.postImage
                        alt="img"
                      className="cardImg"
                      />)

                    } */}
                  </Grid>
                  <p className="appDevNote">PostDisplayCard</p>
                </Grid>
              )}
            </Grid>
            <Grid item sm={2}>
              {!allowEdit && (
                <button
                  onClick={() => {
                    //setAllowEdit(!allowEdit);
                    initEdit();
                  }}
                  style={{ color: "blue" }}
                >
                  Edit
                </button>
              )}
            </Grid>
          </Grid>
          {allowEdit && (
            <>
              <EditPostCard
                data={props.post}
                closeEdit={closeEdit}
                refresh={props.refresh}
              ></EditPostCard>
            </>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default PostDisplayCard;
