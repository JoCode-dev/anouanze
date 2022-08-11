import { GET_ALL_EVENTS } from "../constants/reducers";
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.payload;

    default:
      return state;
  }
}
