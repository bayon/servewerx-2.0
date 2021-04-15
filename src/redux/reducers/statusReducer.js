import { GET_STATUS_COLOR, SET_STATUS_BLUE, SET_STATUS_GREEN } from "../actions/statusAction";

const initialState = {
    statusColor:'undefined'
};

export default function (state = initialState, action) {
  switch (action.type) {
     
    case SET_STATUS_BLUE: 
      return {
        ...state, 
        statusColor:'BLUE'
      }
    case SET_STATUS_GREEN: 
      return {
        ...state, 
        statusColor:'GREEN'
      }
    case GET_STATUS_COLOR: 
      return {
        ...state,
      }
    
  }
  return state;
}
 