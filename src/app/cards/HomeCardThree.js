import { Typography } from "@material-ui/core";
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
const HomeCardThree = () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <div className="homeCard">
      <animated.div
        className="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
        title="Title hello..."
      >
        <div
          className="innerHomeCard"
          style={{ height: "125px", padding: "20px" }}
        >
          <Typography variant="h5" component="h2">
            Hiring
          </Typography>

          <Typography variant="body2" component="p" color="textSecondary">
            Find a professional
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            Find a subcontractor
          </Typography>
        </div>
      </animated.div>
    </div>
  );
};

export default HomeCardThree;
