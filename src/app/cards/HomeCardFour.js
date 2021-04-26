import { Typography } from "@material-ui/core";
import React, { useState } from "react";
//---
import { animated, useSpring } from "react-spring";
import "../../App.css";
import FreeRegistrationPage from "../pages/FreeRegistrationPage";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.07,
];
const trans = (x, y, s) => `perspective(600px)  scale(${s})`;
const HomeCardFour = (data) => {


  console.log('Home Card Four  props data:',data)
  const [showRegister, setShowRegister] = useState(false);

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const displayRegistration = () => {
    setShowRegister(!showRegister);
  };
console.log('JUST PROPS: ',props)
console.log('just data:',data)


const comeOn = () => {
  console.log('come on fn!' )
  data.browse()
}
  return (
    <div className="homeCard">
      <animated.div
        className="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
        title="Browse or Register"
      >
        <div
          className="innerHomeCard"
          style={{ minHeight: "125px", height: "auto", padding: "20px" }}
        >
          {!showRegister && (
            <>
              <Typography variant="h5" component="h2">
                Browse for Free
              </Typography>
              

              <Typography variant="body2" component="p" color="textSecondary">
                or  
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                Register to place your ad
              </Typography>

              <button onClick={displayRegistration}>Register Now</button>

           
            </>
          )}

          {showRegister && <FreeRegistrationPage closeRegistration={displayRegistration}></FreeRegistrationPage>}
        </div>
      </animated.div>
    </div>
  );
};

export default HomeCardFour;
