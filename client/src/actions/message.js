import { SET_MESSAGE } from "../constants/reducers";

export const setMessage = (message) => async (dispatch) => {
  dispatch({ type: SET_MESSAGE, payload: message });
};
