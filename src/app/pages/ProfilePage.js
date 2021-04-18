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
        console.log("result:", result);
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
        <p className="cardDevNote" >ProfilePage</p>
        </Grid>
    
  );
};

export default ProfilePage;
