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
    <div>
      
        
      <p className="cardDevNote" >ProfilePage</p>

        <ProfileCard user={user} refresh={getUserProfile}></ProfileCard>
        <div style={{ textAlign: "left" }}>
          <ul>
            <li>
              PERSONAL PROFILE
              <ul>
               
                <li>activate/deactivate account</li>
                <li>Public Title:</li>
                <li>Public Story:</li>
                
              </ul>
            </li>
            <li>
              ACTIONS: 
              <ul>
                <li>Edit My Profile Info</li>
                <li>Verify My Information.</li>
              </ul>
            </li>
          </ul>
        </div>
        
      
    </div>
  );
};

export default ProfilePage;
