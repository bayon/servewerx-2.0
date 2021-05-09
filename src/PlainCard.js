import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import React, { useEffect, useState } from "react";
import "../../App.css";

 
const PlainCard = (props) => {

     const [seeDetails,setSeeDetails] = useState(false); 

    const [inProgress, setInProgress] = useState(false);
    console.log("inProgress:", inProgress);
    useEffect(() => {
      setInProgress(inProgress);
    }, [inProgress]);
  
     

  return (
    <div  className="card-plain">
            <p className="appDevNote" >PlainCard</p>

      <Typography variant="h5" component="h2">
        {props.user.fullName}
      </Typography>
  
      <button onClick={() => {setSeeDetails(!seeDetails)} } >{seeDetails ? "hide" : "details" }</button>
      {seeDetails && 
      (
        <>
        
        <div style={{ marginTop: 15 }}>
                <a
                  href={"mailto:"+props.user.email}
                  style={{ color: "#222", textDecoration: "none" }}
                >
                  {props.user.email} <Icon>email</Icon>
                </a>
              </div>
        </>
      )
      }
    </div>
  );
};

export default PlainCard;
