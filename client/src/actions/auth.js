import { AUTH, LOGOUT, SET_MESSAGE } from "../constants/reducers";
import * as api from "../api";

export const signup = (userData) => async (dispatch) => {
  try {
    await api.register(userData).then((res) => {
      dispatch({ type: AUTH, user: res.data });
      window.location = "/";
    });
  } catch (error) {
    dispatch({ type: SET_MESSAGE, payload: error?.response?.data?.message });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    await api.login(userData).then((res) => {
      dispatch({ type: AUTH, user: res.data });
      window.location = "/";
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    dispatch({ type: SET_MESSAGE, payload: error?.response?.data?.message });
  }
};

export const logout = () => async (dispatch) => {
  await api.logout();
  dispatch({ type: LOGOUT });
};
