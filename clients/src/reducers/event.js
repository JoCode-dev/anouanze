import { GET_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../constants/reducers";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.payload;

    case UPDATE_EVENT:
      return state.map((event) => {
        if (event._id === action.payload.id) {
          return {
            ...event,
            ...action.payload.data,
          };
        }
        return event;
      });

    case DELETE_EVENT:
      return state.filter((event) => event._id !== action.payload.id);

    default:
      return state;
  }
}
