import {
  GET_PAROISSE,
  UPDATE_PAROISSE,
  DELETE_PAROISSE,
  CHOOSE_PAROISSE,
  UNCHOOSE_PAROISSE,
  REMOVE_PRIEST,
  REMOVE_MESSE,
  REMOVE_CONFESSION,
} from "../constants/reducers";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAROISSE:
      return action.payload;

    case UPDATE_PAROISSE:
      return state.map((paroisse) => {
        if (paroisse._id !== action.payload.id) {
          return {
            ...paroisse,
            ...action.payload.data,
          };
        }
        return paroisse;
      });

    case DELETE_PAROISSE:
      return state.filter((paroisse) => paroisse._id !== action.payload.id);

    case CHOOSE_PAROISSE:
      return state.map((paroisse) => {
        if (paroisse._id === action.payload.paroisseId) {
          return {
            ...paroisse,
            paroissiens: [action.payload.userId, ...paroisse.paroissiens],
          };
        }
        return paroisse;
      });

    case UNCHOOSE_PAROISSE:
      return state.map((paroisse) => {
        if (paroisse._id === action.payload.paroisseId) {
          return {
            ...paroisse,
            paroissiens: paroisse.paroissiens.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return paroisse;
      });

    case REMOVE_PRIEST:
      return state.map((paroisse) => {
        if (paroisse._id === action.payload.id) {
          return {
            ...paroisse,
            clergy: paroisse.clergy.filter(
              (priest) => priest.id !== action.payload.priestId
            ),
          };
        } else return paroisse;
      });

    case REMOVE_MESSE:
      return state.map((paroisse) => {
        if (paroisse._id === action.payload.id) {
          return {
            ...paroisse,
            messes: paroisse.messes.filter(
              (messe) => messe.id !== action.payload.messeId
            ),
          };
        } else return paroisse;
      });

    case REMOVE_CONFESSION:
      return state.map((paroisse) => {
        if (paroisse._id === action.payload.id) {
          return {
            ...paroisse,
            confessions: paroisse.messes.filter(
              (messe) => messe.id !== action.payload.confessionId
            ),
          };
        } else return paroisse;
      });

    default:
      return state;
  }
}
