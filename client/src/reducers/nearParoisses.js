import { GET_NEAR_PAROISSES } from "../constants/reducers";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEAR_PAROISSES:
      return action.payload;

    default:
      return state;
  }
}
