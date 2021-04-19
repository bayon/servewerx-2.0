import { config } from '../../Constants';

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAIL = "LOGOUT_USER_FAIL";

//
export const ALL_USERS_SUCCESS = "ALL_USERS_SUCCESS";
export const ALL_USERS_FAIL = "ALL_USERS_FAIL";

export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAIL = "USER_PROFILE_FAIL";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const FILTER_USERS_SUCCESS = "FILTER_USERS_SUCCESS";
export const FILTER_USERS_FAIL = "FILTER_USERS_FAIL";


export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAIL = "GET_CATEGORIES_FAIL";


//const API_URL = "http://localhost:4000/api";
//const API_URL = "https://arcane-eyrie-05882.herokuapp.com/api"

const API_URL = config.url.API_URL

export const registerUser = (authData) => {
  const { fullName, email, password } = authData;
  return async (dispatch) => {
    //benefit: can now make async http request to Register
    const result = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const resultData = await result.json();
    if (resultData.success){
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: resultData,
          });
    } else {
        dispatch({
            type: REGISTER_USER_FAIL,
          });
    }
   
    return resultData;

  };
};

export const logoutUser = () => {

  return async (dispatch) => {
    dispatch({
        type: LOGOUT_USER_SUCCESS,
        })
  }
}

export const loginUser = (authData) => {
  const { email, password } = authData;
  return async (dispatch) => {
    //benefit: can now make async http request to Login
    const result = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const resultData = await result.json();
      if(resultData.success){
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: resultData,
          });
      } else {
        dispatch({
            type: LOGIN_USER_FAIL,
          });
      }
      return resultData; //Why?:  so that we have access to it in the dispatch to the action from loginScreen.
    //
    
  };
};


export const allUsers = () => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/users/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
     
      });
  
      const resultData = await result.json();
      if(resultData){
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: resultData,
          });
      } else {
        dispatch({
            type: ALL_USERS_FAIL,
          });
      }
      return resultData;  
    
  };
};



export const userProfile = () => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('forteworksToken')
        },
     
      });
  
      const resultData = await result.json();
      if(resultData){
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: resultData,
          });
      } else {
        dispatch({
            type: USER_PROFILE_FAIL,
          });
      }
      return resultData;  
    
  };
};


export const updateUser = (authData) => {
  console.log('authData',authData)
  const { fullName, email, phone , profileImage, address, city, state, zip, website } = authData;
  return async (dispatch) => {
    //benefit: can now make async http request to Register
    const result = await fetch(`${API_URL}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        profileImage,
        address,
        city,
        state,
        zip,
        website
      }),
    });

    const resultData = await result.json();
    if (resultData.success){
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: resultData,
          });
    } else {
        dispatch({
            type: UPDATE_USER_FAIL,
          });
    }
   
    return resultData;

  };
};

// filter 
export const filterUsers = (key) => {
  console.log('filter key is ...',key)
  return async (dispatch) => {
    
    const result = await fetch(`${API_URL}/users/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
        }),
      });
  
      const resultData = await result.json();
      if(resultData.success){
        dispatch({
            type: FILTER_USERS_SUCCESS,
            payload: resultData,
          });
      } else {
        dispatch({
            type: FILTER_USERS_FAIL,
          });
      }
      return resultData;  
    
  };
   



};
export const getCategories = () => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/users/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
     
      });
  
      const resultData = await result.json();
      if(resultData){
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: resultData,
          });
      } else {
        dispatch({
            type: GET_CATEGORIES_FAIL,
          });
      }
      return resultData;  
    
  };
};