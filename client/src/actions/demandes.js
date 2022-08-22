import * as api from "../api";
import {
  GET_DEMANDS_BY_PAROISSE,
  GET_DEMAND,
  UPDATE_DEMANDE,
} from "../constants/reducers";

export const addDemande = (data) => async (dispatch) => {
  try {
    await api.addDemande(data);
  } catch (error) {}
};

export const updateDemande = (id) => async (dispatch) => {
  try {
    const data = await api.updateDemande(id);
    dispatch({ type: UPDATE_DEMANDE, payload: data });
  } catch (error) {}
};

export const getDemand = (id) => async (dispatch) => {
  try {
    const data = await api.getDemand(id);
    dispatch({ type: GET_DEMAND, payload: data });
  } catch (error) {}
};

export const getDemandsByParoisse = (id) => async (dispatch) => {
  try {
    const data = await api.getDemandsByParoisse(id);
    dispatch({ type: GET_DEMANDS_BY_PAROISSE, payload: data });
  } catch (error) {}
};
