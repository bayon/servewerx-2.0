import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postAction from "../../redux/actions/postAction";


export default function PostStatus() {
  // Purpose: to sync state between upper and lower components.
  const dispatch = useDispatch();
   const Kolor = useSelector((state) => state.post.statusColor);
  //const Kolor = useSelector((state) => state.post.statusColor);

  useEffect(() => {
    dispatch(postAction.getStatusColor())
      .then(async () => {
        // result would be undefined
        console.log("2 status color:", Kolor);
      })
      .catch((err) => console.log(err));
  }, [Kolor]);

  
  return (
    <div>
      <button style={{background:`${Kolor}`, height:"15px", fontSize:".5em",color:"white",padding:"0 .5em 0 .5em"}} >status</button>
    </div>
  );
}
