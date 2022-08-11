import { GET_USER, UPDATE_USER, DELETE_USER } from "../constants/reducers";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPDATE_USER:
      return state.map((user) => {
        if (user._id !== action.payload.id) {
          return {
            ...user,
            ...action.payload.data,
          };
        }
        return user;
      });

    case DELETE_USER:
      return state.filter((user) => user._id !== action.payload.id);

    default:
      return state;
  }
}
