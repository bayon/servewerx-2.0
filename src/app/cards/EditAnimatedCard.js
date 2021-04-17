import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from 'react-spring';
import "../../App.css";
import * as postAction from "../../redux/actions/postAction";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.07,
];
const trans = (x, y, s) => `perspective(600px)  scale(${s})`;
const EditAnimatedCard = () => {
  const [editing, setEditing] = useState(true);
  const dispatch = useDispatch();
  const Kolor = useSelector((state) => state.post.statusColor);

  
   
  //////////////
  const [on, set] = React.useState(true);

  const Text1 = ({ on }) => {
    const props = useSpring({ opacity: on ? 1 : 0, from: { opacity: 0 } });
    return <animated.div style={props}>Editing...</animated.div>;
  };
 

  useEffect(() => {
    dispatch(postAction.getStatusColor())
      .then(async (res) => {
        // result would be undefined
        set(!on)
          
      })
      .catch((err) => console.log(err));

    

  }, [Kolor]);

 
  return (
    <div>
        
       <Text1 on={on}>editing</Text1>

    </div>
  );
};

export default EditAnimatedCard;
  