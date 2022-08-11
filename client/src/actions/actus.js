import * as api from "../api";

import {
  GET_ALL_ACTUS,
  GET_ACTU,
  GET_ACTU_BY_ID,
  CREATE_ACTU,
  UPDATE_ACTU,
  DELETE_ACTU,
} from "../constants/reducers";

export const getAllActus = () => async (dispatch) => {
  try {
    const { data } = await api.getAllActus();
    dispatch({ type: GET_ALL_ACTUS, payload: data });
  } catch (error) {}
};

export const getActu = (id) => async (dispatch) => {
  try {
    const { data } = await api.getActu(id);
    dispatch({ type: GET_ACTU, payload: data });
  } catch (error) {}
};

export const getActuByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.getActusById(id);
    dispatch({ type: GET_ACTU_BY_ID, payload: data });
  } catch (error) {}
};

export const createActu = (data) => async (dispatch) => {
  try {
    await api.createActu(data);
  } catch (error) {}
};

export const updateActu = (id, actuData) => async (dispatch) => {
  try {
    const { data } = await api.updateActu(id, actuData);
    dispatch({ type: UPDATE_ACTU, payload: { id, data } });
  } catch (error) {}
};

export const deleteActu = (id) => async (dispatch) => {
  try {
    await api.removeActu(id);
    dispatch({ type: DELETE_ACTU, payload: { id } });
  } catch (error) {}
};
