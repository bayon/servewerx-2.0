import {
  ACCEPT_POST_FAIL,
  ACCEPT_POST_SUCCESS,
  ALL_SITE_POSTS_FAIL,
  ALL_SITE_POSTS_SUCCESS,
  ALL_USER_POSTS_FAIL,
  ALL_USER_POSTS_SUCCESS,
  CANCEL_POST_FAIL,
  CANCEL_POST_SUCCESS,
  CLEAR_POST_FAIL,
  CLEAR_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  FILTER_OWNERS_POSTS_FAIL,
  FILTER_OWNERS_POSTS_SUCCESS,
  FILTER_POSTS_FAIL,
  FILTER_POSTS_SUCCESS,
  GET_STATUS_COLOR,
  INIT_POST_FAIL,
  INIT_POST_SUCCESS,
  SET_STATUS_BLUE,
  SET_STATUS_GREEN,
  UPDATE_POST_FAIL,
  UPDATE_POST_SUCCESS
} from "../actions/postAction";

const initialState = {
  havePosts: false,
  posts: [],
  post: {},
  usersPosts: [],
  haveUsersPosts: false,
  errors: {},
  newPost: false,
  statusColor: "undefined",
  postStepZero: false,
  postStepOne: false,
  postStepTwo: false,
  postStepThree: false,
  postType: ["select type", "Looking For Work", "Hiring", "Advertising"],
  categories: [
    "select category",
    "construction",
    "remodeling",
    "plumbing",
    "painting",
    "carpentry",
    "siding",
    "drywall",
    "concrete",
    "frameing",
    "cabinetry",
    "tile",
    "decks",
    "excavating",
    "appliances",
    "landscaping",
  ],
};
//!!!!: The order of there 'categories' is important !!! And I just changed it !!!

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_USER_POSTS_SUCCESS:
      return {
        ...state,
        usersPosts: action.payload,
        haveUsersPosts: true,
      };
    case ALL_USER_POSTS_FAIL:
      return {
        ...state,
        errors: true,
      };
    case ALL_SITE_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        havePosts: true,
      };
    case ALL_SITE_POSTS_FAIL:
      return {
        ...state,
        errors: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        newPost: true,
        postStepOne: true,
        statusColor: "BLUE",
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        errors: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        statusColor: "BLUE",
        postStepTwo: true,
      };
    case UPDATE_POST_FAIL:
      return {
        ...state,
        errors: true,
      };
    case FILTER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        havePosts: true,
      };
    case FILTER_POSTS_FAIL:
      return {
        ...state,
        errors: true,
      };
    case FILTER_OWNERS_POSTS_SUCCESS:
      return {
        ...state,
        usersPosts: action.payload,
        haveUsersPosts: true,
      };
    case FILTER_OWNERS_POSTS_FAIL:
      return {
        ...state,
        errors: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        statusColor: "RED",
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        errors: true,
      };

    case ACCEPT_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        statusColor: "GREEN",
        postStepZero: false,
        postStepOne: false,
        postStepTwo: false,
        postStepThree: false,
      };
    case ACCEPT_POST_FAIL:
      return {
        ...state,
        errors: true,
      };

    case CANCEL_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        statusColor: "GREEN",
        postStepZero: false,
        postStepOne: false,
        postStepTwo: false,
        postStepThree: false,
      };
    case CANCEL_POST_FAIL:
      return {
        ...state,
        errors: true,
      };

    case INIT_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        statusColor: "GREEN",
        postStepZero: true,
      };
    case INIT_POST_FAIL:
      return {
        ...state,
        errors: true,
      };

    case CLEAR_POST_SUCCESS:
      return {
        ...state,

        statusColor: "GREEN",
        postStepZero: false,
        postStepOne: false,
        postStepTwo: false,
        postStepThree: false,
      };
    case CLEAR_POST_FAIL:
      return {
        ...state,
        errors: true,
      };
    //====STATUS: GREEN = editable, BLUE = being edited.
    //used to refresh data after a record is created or edited.
    case SET_STATUS_BLUE:
      return {
        ...state,
        statusColor: "BLUE",
      };
    case SET_STATUS_GREEN:
      return {
        ...state,
        statusColor: "GREEN",
      };
    case GET_STATUS_COLOR:
      return {
        ...state,
      };
    //=====================
    default:
      break;
  }
  return state;
}
