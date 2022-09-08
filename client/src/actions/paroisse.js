import * as api from "../api";
import {
  GET_ALL_PAROISSE,
  GET_PAROISSE,
  GET_NEAR_PAROISSES,
  UPDATE_PAROISSE,
  DELETE_PAROISSE,
  CHOOSE_PAROISSE,
  UNCHOOSE_PAROISSE,
  REMOVE_PRIEST,
  REMOVE_MESSE,
  REMOVE_CONFESSION,
} from "../constants/reducers";

export const createParoisse = (data) => async (dispatch) => {
  try {
    await api.createParoisse(data);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export const getAllParoisse = (num) => async (dispatch) => {
  try {
    const { data } = await api.getParoisses();
    const newArray = data.slice(0, num);
    dispatch({ type: GET_ALL_PAROISSE, payload: newArray });
  } catch (error) {}
};

export const getParoisse = (id) => async (dispatch) => {
  try {
    const { data } = await api.getParoisse(id);
    dispatch({ type: GET_PAROISSE, payload: data });
  } catch (error) {}
};

// Paroisses à proximité
export const getNearParoisses = (coords) => async (dispatch) => {
  try {
    const { data } = await api.getNearParoisses(coords);
    dispatch({ type: GET_NEAR_PAROISSES, payload: data });
  } catch (error) {}
};

export const updateParoisse = (id, paroisseData) => async (dispatch) => {
  try {
    const { data } = await api.updateParoisse(id, paroisseData);
    dispatch({ type: UPDATE_PAROISSE, payload: { id, data } });
  } catch (error) {}
};

export const deleteParoisse = (id) => async (dispatch) => {
  try {
    await api.deleteParoisse(id);
    dispatch({ type: DELETE_PAROISSE, payload: { id } });
  } catch (error) {}
};

export const chooseParoisse = (paroisseId, userId) => async (dispatch) => {
  try {
    const { data } = await api.chooseParoisse(paroisseId, userId);
    dispatch({ type: CHOOSE_PAROISSE, payload: { paroisseId, userId } });
  } catch (error) {}
};

export const unchooseParoisse = (paroisseId, userId) => async (dispatch) => {
  try {
    const { data } = await api.unchooseParoisse(paroisseId, userId);
    dispatch({ type: UNCHOOSE_PAROISSE, payload: { paroisseId, userId } });
  } catch (error) {}
};

export const addPriest = (id, data) => async (dispatch) => {
  try {
    await api.addPriest(id, data);
  } catch (error) {}
};

export const removePriest = (id, priestId) => async (dispatch) => {
  try {
    await api.removePriest(id, priestId);
    dispatch({ type: REMOVE_PRIEST, payload: { id, priestId } });
  } catch (error) {}
};

// Add Messes
export const addMesses = (id, data) => async (dispatch) => {
  try {
    await api.addMesses(id, data);
  } catch (error) {}
};

// Remove messes
export const removeMesse = (id, messeId) => async (dispatch) => {
  try {
    await api.removeMesse(id, messeId);
    dispatch({ type: REMOVE_MESSE, payload: { id, messeId } });
  } catch (error) {}
};

// Add Confessions
export const adConfession = (id, data) => async (dispatch) => {
  try {
    await api.addConfessions(id, data);
  } catch (error) {}
};

// Remove Confessions
export const removeConfession = (id, confessionId) => async (dispatch) => {
  try {
    await api.removeConfessions(id, confessionId);
    dispatch({ type: REMOVE_MESSE, payload: { id, confessionId } });
  } catch (error) {}
};
