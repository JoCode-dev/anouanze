import {
  GET_ALL_USERS,
  GET_USER,
  UPDATE_USER,
} from "../constants/reducers";

import * as api from "../api";

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: GET_ALL_USERS, payload: data });
  } catch (error) {}
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({ type: GET_USER, payload: data });
  } catch (error) {}
};

export const updateUser = (id, data) => async (dispatch) => {
  await api.updateUser(id, data);
  dispatch({ type: UPDATE_USER, payload: { id, data } });
};
