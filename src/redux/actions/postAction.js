import { config } from "../../Constants";

export const ALL_USER_POSTS_SUCCESS = "ALL_USER_POSTS_SUCCESS";
export const ALL_USER_POSTS_FAIL = "ALL_USER_POSTS_FAIL";

export const ALL_SITE_POSTS_SUCCESS = "ALL_SITE_POSTS_SUCCESS";
export const ALL_SITE_POSTS_FAIL = "ALL_SITE_POSTS_FAIL";

export const POST_GET_SUCCESS = "POST_GET_SUCCESS";
export const POST_GET_FAIL = "POST_GET_FAIL";

export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAIL = "UPDATE_POST_FAIL";

export const FILTER_POSTS_SUCCESS = "FILTER_POSTS_SUCCESS";
export const FILTER_POSTS_FAIL = "FILTER_POSTS_FAIL";

export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAIL = "CREATE_POST_FAIL";

export const FILTER_OWNERS_POSTS_SUCCESS = "FILTER_OWNERS_POSTS_SUCCESS";
export const FILTER_OWNERS_POSTS_FAIL = "FILTER_OWNERS_POSTS_FAIL";


export const ACCEPT_POST_SUCCESS = "ACCEPT_POST_SUCCESS";
export const ACCEPT_POST_FAIL = "ACCEPT_POST_FAIL";

export const CANCEL_POST_SUCCESS = "CANCEL_POST_SUCCESS";
export const CANCEL_POST_FAIL = "CANCEL_POST_FAIL";

export const INIT_POST_SUCCESS = "INIT_POST_SUCCESS";
export const INIT_POST_FAIL = "INIT_POST_FAIL";

export const CLEAR_POST_SUCCESS = "CLEAR_POST_SUCCESS";
export const CLEAR_POST_FAIL = "CLEAR_POST_FAIL";

const API_URL = config.url.API_URL;

export const SET_STATUS_GREEN = "SET_STATUS_GREEN";
export const SET_STATUS_BLUE = "SET_STATUS_BLUE";
export const GET_STATUS_COLOR = "GET_STATUS_COLOR";

export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAIL = "DELETE_POST_FAIL";

export const UPDATE_CREATING_POST_SUCCESS = "UPDATE_CREATING_POST_SUCCESS";
export const UPDATE_CREATING_POST_FAIL = "UPDATE_CREATING_POST_FAIL";


export const allSitePosts = () => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/site/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultData = await result.json();
    if (resultData) {
      dispatch({
        type: ALL_SITE_POSTS_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: ALL_SITE_POSTS_FAIL,
      });
    }
    return resultData;
  };
};

export const createPost = (postData) => {
  //console.log("CREATE POST ACTION: postData:", postData);

  const {
    userId,
    title,
    description,
    category,
    postType,
    email,
    phone,
    address,
    city,
    state,
    zip,
    postImage,
  } = postData;
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
        description,
        category,
        postType,
        email,
        phone,
        address,
        city,
        state,
        zip,
        postImage,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: CREATE_POST_FAIL,
      });
    }

    return resultData;
  };
};

export const getPost = () => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("forteworksToken"),
      },
    });

    const resultData = await result.json();
    if (resultData) {
      dispatch({
        type: POST_GET_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: POST_GET_FAIL,
      });
    }
    return resultData;
  };
};

export const updatePost = (postData) => {
  console.log("POST ACTION UPDATE POST: postData:", postData);
  const {
    id,
    userId,
    title,
    description,
    category,
    postType,
    email,
    phone,
    address,
    city,
    state,
    zip,
    website,
    postImage,
    activated,
  } = postData;
  //post versus posts in URL
  return async (dispatch) => {
    // ? why getting a 404 for posts/update ? 
    //? NOT FOUND ? ? ? ? ? 
    const result = await fetch(`${API_URL}/posts/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        userId,
        title,
        description,
        category,
        postType,
        email,
        phone,
        address,
        city,
        state,
        zip,
        website,
        postImage,
        activated,
      }),
    });

    const resultData = await result.json();
    console.log("post update resultData:",resultData);
    if (resultData.success) {
      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: UPDATE_POST_FAIL,
      });
    }

    return resultData;
  };
};

// filter : FILTERS ALL POSTS:
export const filterPosts = (key) => {
  console.log("filter key is ...", key);
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: FILTER_POSTS_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: FILTER_POSTS_FAIL,
      });
    }
    return resultData;
  };
};

 

export const filterOwnersPosts = (key, userId) => {
  console.log("OWNERS: filter key is ...", key);
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/filterOwners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        userId,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: FILTER_OWNERS_POSTS_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: FILTER_OWNERS_POSTS_FAIL,
      });
    }
    return resultData;
  };
};


export const allUserPosts = (key) => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/user/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: ALL_USER_POSTS_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: ALL_USER_POSTS_FAIL,
      });
    }
    return resultData;
  };
  
};





export const deletePost = (key) => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: DELETE_POST_FAIL,
      });
    }
    return resultData;
  };
};



export const initPost = (key) => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/initPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: INIT_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: INIT_POST_FAIL,
      });
    }
    return resultData;
  };
  
};


export const acceptPost = (key) => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/acceptPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: ACCEPT_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: ACCEPT_POST_FAIL,
      });
    }
    return resultData;
  };
  
};


export const cancelPost = (key) => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/cancelPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: CANCEL_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: CANCEL_POST_FAIL,
      });
    }
    return resultData;
  };
  
};

export const clearPost = (key) => {
  return async (dispatch) => {
    const result = await fetch(`${API_URL}/posts/clearPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
      }),
    });

    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: CLEAR_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: CLEAR_POST_FAIL,
      });
    }
    return resultData;
  };
  
};



export const updateCreatingPost = (postData) => {
  console.log("POST ACTION UPDATE  CREATING-POST: postData:", postData);
  const {
    id,
    userId,
    title,
    description,
    category,
    postType,
    email,
    phone,
    address,
    city,
    state,
    zip,
    website,
    postImage,
    activated,
  } = postData;
  //post versus posts in URL
  return async (dispatch) => {
    // ? why getting a 404 for posts/update ? 
    const result = await fetch(`${API_URL}/posts/updateCreating`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        userId,
        title,
        description,
        category,
        postType,
        email,
        phone,
        address,
        city,
        state,
        zip,
        website,
        postImage,
        activated,
      }),
    });

    const resultData = await result.json();
    console.log("post update resultData:",resultData);
    if (resultData.success) {
      dispatch({
        type: UPDATE_CREATING_POST_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: UPDATE_CREATING_POST_FAIL,
      });
    }

    return resultData;
  };
};

/////////////////////////
export const setStatusGreen = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_GREEN,
    });
  };
};
export const setStatusBlue = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_STATUS_BLUE,
    });
  };
};
export const getStatusColor = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_STATUS_COLOR,
    });
  };
};
//////////////////////////////////