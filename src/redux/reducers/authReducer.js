import {
  ALL_USERS_FAIL,
  ALL_USERS_SUCCESS,
  FILTER_USERS_FAIL,
  FILTER_USERS_SUCCESS,










  GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS, LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS
} from "../actions/authAction";

const initialState = {
  authorized: false,
  haveUsers: false,
  loginResult:{},
  loginSuccess: false,
  users: [],
  user: {},
  haveUser: false,
  categories:[],
  haveCategories: false,
  errors: {},
  usstates :['Select State','Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        authorized: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loginResult: action.payload,
        loginSuccess: true,
        authorized: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        authorized: false,
        user:{},
        haveUsers:false,
        users: [],
        haveUser: false, 
        loginResult: {},
        loginSuccess:false
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        haveUsers: true,
      };
    case ALL_USERS_FAIL:
      return {
        ...state,
        errors: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        haveUser: true,
        authorized: true,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        errors: true,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        errors: true,
      };

    case USER_PROFILE_FAIL:
      return {
        ...state,
        errors: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        errors: true,
      };
    case FILTER_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        haveUsers: true,
      };
    case FILTER_USERS_FAIL:
      return {
        ...state,
        errors: true,
      };
      case GET_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          haveCategories: true,
        };
      case GET_CATEGORIES_FAIL:
        return {
          ...state,
          errors: true,
        };
    default:
      break;
  }
  return state;
}
