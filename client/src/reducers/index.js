import { combineReducers } from "redux";

import auth from "./auth";
import users from "./users";
import user from "./user";
import events from "./events";
import threeEvents from "./threeEvents";
import premiumEvents from "./premiumEvents";
import othersEvent from "./othersEvent";
import event from "./event";
import actu from "./actu";
import actus from "./actus";
import message from "./message";
import paroisse from "./paroisse";
import paroisses from "./paroisses";
import nearParoisses from "./nearParoisses";
import demande from "./demande";
import demandes from "./demandes";

export default combineReducers({
  auth,
  user,
  users,
  event,
  events,
  threeEvents,
  premiumEvents,
  othersEvent,
  actu,
  actus,
  message,
  paroisse,
  paroisses,
  nearParoisses,
  demande,
  demandes,
});
