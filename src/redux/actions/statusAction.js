export const SET_STATUS_GREEN = "SET_STATUS_GREEN"
export const SET_STATUS_BLUE = "SET_STATUS_BLUE"
export const GET_STATUS_COLOR = "GET_STATUS_COLOR"


export const setStatusGreen = () => {
    return async (dispatch) => {
      dispatch({
          type: SET_STATUS_GREEN,
          })
    }
  }
  export const setStatusBlue = () => {
    return async (dispatch) => {
      dispatch({
          type: SET_STATUS_BLUE,
          })
    }
  }
 export const getStatusColor = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_STATUS_COLOR,
        })
    }
 }
 