import { GET_DEMAND, UPDATE_DEMANDE } from "../constants/reducers";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEMAND:
      return action.payload;

    case UPDATE_DEMANDE:
      return state.map((demand) => {
        if (demand._id === action.payload.id) {
          return {
            ...demand,
            ...action.payload.data,
          };
        }
        return demand;
      });

    default:
      return state;
  }
}
