import { AUTH, LOGOUT } from "../constants/reducers";


// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { authData: null }, action) {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("jwt", JSON.stringify({ ...action?.user }));
      return { ...state, authData: action?.user };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
}
