import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postAction from "../../redux/actions/postAction";
import EditAnimatedCard from "../cards/EditAnimatedCard";

export default function StatusChecker() {
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
    <div style={{position:"fixed",bottom:"0px",left:"0px",background:"#000",opacity:".8", width:"100%"}}>
      <p style={{color:"#fff",fontSize:".5em"}}>Status Checker: 
      <button onClick={setStatusGreen} style={{background:"green",height:"15px",  color:"white",padding:"0 .5em 0 .5em"}}>Green</button>
      <button onClick={setStatusBlue} style={{background:"blue",height:"15px",  color:"white",padding:"0 .5em 0 .5em"}}>Blue</button>
      <button style={{ background: `${Kolor}`,height:"10px",  color:"white",padding:"0 .5em 0 .5em" }}></button>
       
       <EditAnimatedCard></EditAnimatedCard>
      
     
      </p>
    </div>
  );
}


