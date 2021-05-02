import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postAction from "../../redux/actions/postAction";

export default function AppFooter() {
  // Purpose: to sync state between upper and lower components.
  const dispatch = useDispatch();
  const Kolor = useSelector((state) => state.post.statusColor);
  
  useEffect(() => {
    dispatch(postAction.getStatusColor())
      .then(async () => {
        // result would be undefined
        //console.log("2 status color:", Kolor);
         
      })
      .catch((err) => console.log(err));
  }, [Kolor]);

  const setStatusBlue = () => {
    dispatch(postAction.setStatusBlue())
      .then(async () => {
        // result would be undefined
      })
      .catch((err) => console.log("error:", err));
  };
  const setStatusGreen = () => {
    dispatch(postAction.setStatusGreen())
      .then(async () => {
        // result would be undefined
      })
      .catch((err) => console.log("error:", err));
  };
  return (
    <div style={{position:"fixed",bottom:"0px",left:"0px",background:"#000",opacity:".8", width:"100%", height:"25px"}}>
      <p style={{color:"#fff",fontSize:".5em"}}>Servewerx is created by small business for small business by 
      &nbsp;<a href="https://www.forteworks.com"  style={{textDecoration:"none",color:"orange"}} target="blank">forteworks.com</a> .
      </p>
    </div>
  );
}


