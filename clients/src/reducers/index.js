import { combineReducers } from "redux";

import auth from "./auth";
import users from "./users";
import user from "./user";
import events from "./events";
import threeEvents from "./threeEvents";
import event from "./event";
import actu from "./actu";
import actus from "./actus";
import message from "./message";
import paroisse from "./paroisse";
import paroisses from "./paroisses";
import nearParoisses from "./nearParoisses";

export default combineReducers({
  auth,
  user,
  users,
  event,
  events,
  threeEvents,
  actu,
  actus,
  message,
  paroisse,
  paroisses,
  nearParoisses,
});
