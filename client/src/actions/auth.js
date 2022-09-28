import { AUTH, LOGOUT, SET_MESSAGE } from "../constants/reducers";
import * as api from "../api";

export const signup = (userData, bool) => async (dispatch) => {
  try {
    await api.register(userData).then((res) => {
      dispatch({ type: AUTH, user: res.data });
      window.location = "/";
    });
  } catch (error) {
    if (bool === false) {
      await api.login(userData).then((res) => {
        dispatch({ type: AUTH, user: res.data });
        window.location = "/";
      });
    } else {
      dispatch({ type: SET_MESSAGE, payload: error?.response?.data?.message });
    }
    dispatch({ type: SET_MESSAGE, payload: error?.response?.data?.message });
  }
};

export const login = (userData, bool) => async (dispatch) => {
  try {
    await api.login(userData).then((res) => {
      dispatch({ type: AUTH, user: res.data });
      window.location = "/";
    });
  } catch (error) {
    if (bool === true) {
      await api.register(userData).then((res) => {
        dispatch({ type: AUTH, user: res.data });
        window.location = "/";
      });
    } else {
      dispatch({ type: SET_MESSAGE, payload: error?.response?.data?.message });
    }
  }
};

export const logout = () => async (dispatch) => {
  await api.logout();
  dispatch({ type: LOGOUT });
};
