import {
  Typography
} from "@material-ui/core";
import React from "react";
//---
import { animated, useSpring } from "react-spring";
import "../../App.css";
  
const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.07,
  ];
  const trans = (x, y, s) => `perspective(600px)  scale(${s})`;
  const FrontEndAnimatedCard = () => {
    const [props, set] = useSpring(() => ({
      xys: [0, 0, 1],
      config: { mass: 5, tension: 350, friction: 40 },
    }));
    return (
      <div style={{opacity:".90"}}>
        <animated.div
          className="card"
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
          title="Title hello..."
        >
          <Typography variant="h5" component="h2">
            Skilled & Professional
          </Typography>
  
          <Typography variant="body2" component="p" color="textSecondary">
            Crafstmen and Small Businesses.
            
          </Typography>
  
          {/* <Button
            size="small"
            onClick={() => {
              alert("call or text me: 812-267-0592");
            }}
          >
            +
          </Button> */}
        </animated.div>
      </div>
    );
  };
  

  export default FrontEndAnimatedCard;