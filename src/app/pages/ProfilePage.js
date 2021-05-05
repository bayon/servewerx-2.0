import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "../../redux/actions/authAction";
import ProfileCard from "../cards/ProfileCard";

const ProfilePage = (props) => {
  var auth = useSelector((state) => state.auth.authorized);
  const [user, setUser] = useState({});
  //var user = useSelector((state) => state.auth.user);
  //var haveUser = useSelector((state) => state.auth.haveUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.userProfile())
      .then(async (result) => {
        console.log("profile result:", result);
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!auth) {
    return <div>not authorized.</div>;
  }
  const getUserProfile = () => {
    dispatch(authAction.userProfile())
      .then(async (result) => {
        console.log("result:", result);
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid
      container
      spacing={0}
      // align="center"
      // justify="center"
      direction="column"
      className="main-component-container"
    >
      <h3>My Profile</h3>

      <ProfileCard user={user} refresh={getUserProfile}></ProfileCard>
      <p className="cardDevNote">ProfilePage</p>
       {/* <Grid>
         { user._id === "607da64cdfa3380004aceabf" &&
            <h1>ME</h1>
         }
       </Grid> */}
    </Grid>
  );
};

export default ProfilePage;


/*
TO GO: reat-spring Parallax 

import { Parallax, ParallaxLayer } from "@react-spring/parallax";


 <Parallax pages={2} style={{ top: "0", left: "0" }}>
        <ParallaxLayer
          offset={0}
          speed={2.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Scroll down</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2}
          style={{ backgroundColor: "#ff6d6d" }}
        />

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <p>Scroll up</p>
        </ParallaxLayer>
      </Parallax>

*/