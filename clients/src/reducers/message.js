import { SET_MESSAGE } from "../constants/reducers";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { message: action.payload };

    default:
      return state;
  }
}
