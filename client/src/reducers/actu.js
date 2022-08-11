import {
  GET_ACTU,
  UPDATE_ACTU,
  DELETE_ACTU,
  GET_ACTU_BY_ID,
} from "../constants/reducers";
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACTU:
    case GET_ACTU_BY_ID:
      return action.payload;

    case UPDATE_ACTU:
      return state.map((actu) => {
        if (actu._id === action.payload.id) {
          return { ...actu, ...action.payload.data };
        }
        return actu;
      });

    case DELETE_ACTU:
      return state.filter((actu) => actu._id !== action.payload.id);

    default:
      return state;
  }
}
