import * as api from "../api";

import {
  GET_ALL_EVENTS,
  GET_EVENT,
  UPDATE_EVENT,
  GET_THREE_FIRST_EVENTS,
  DELETE_EVENT,
} from "../constants/reducers";

export const createEvent = (data) => async (dispatch) => {
  try {
    await api.createEvent(data);
  } catch (error) {}
};

export const getEvent = (id) => async (dispatch) => {
  try {
    const { data } = await api.getEvent(id);
    dispatch({ type: GET_EVENT, payload: data });
  } catch (error) {}
};

export const getAllEvents = () => async (dispatch) => {
  try {
    const { data } = await api.getAllEvents();
    dispatch({ type: GET_ALL_EVENTS, payload: data });
  } catch (error) {}
};

export const getFirstThreeEvents = () => async (dispatch) => {
  try {
    const { data } = await api.getAllEvents();
    const newArr = data.slice(0, 3);
    dispatch({ type: GET_THREE_FIRST_EVENTS, payload: newArr });
  } catch (error) {}
};

export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, eventData);
    dispatch({ type: UPDATE_EVENT, payload: { id, data } });
  } catch (error) {}
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);
    dispatch({ type: DELETE_EVENT, payload: { id } });
  } catch (error) {}
};
