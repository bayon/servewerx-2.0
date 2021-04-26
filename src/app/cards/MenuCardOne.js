import React, { useState } from "react";
//---
import { useSpring } from "react-spring";
import "../../App.css";
import FreeRegistrationPage from "../pages/FreeRegistrationPage";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.07,
];
const trans = (x, y, s) => `perspective(600px)  scale(${s})`;
const MenuCardOne = (data) => {


  console.log('Home Card Four  props data:',data)
  const [showRegister, setShowRegister] = useState(false);

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const displayRegistration = () => {
    console.log('displayRegistration...')
    setShowRegister(!showRegister);
  };
 


 
  return (
    <div className="...homeCard">
      {/* <animated.div
        className="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
        title="Browse or Register"
      > */}
        <div
          className="innerHomeCard"
          style={{ minHeight: "10px", height: "auto", padding: "0px" }}
        >
          {/* <button onClick={ () => {setShowRegister(false)}}>x</button> */}
          {!showRegister && (
            <>
               <button onClick={displayRegistration}>Register Now ... to place your ad.</button>  
            </>
          )}

          {showRegister && <FreeRegistrationPage closeRegistration={displayRegistration} rere={data.rere} props={data}></FreeRegistrationPage> }

        </div>
      {/* </animated.div> */}
    </div>
  );
};

export default MenuCardOne;
