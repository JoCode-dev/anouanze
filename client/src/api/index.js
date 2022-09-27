import axios from "axios";
import Cookies from "js-cookie";
const url = `http://localhost:5000`;

axios.interceptors.request.use((req) => {
  if (localStorage.getItem("jwt")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("jwt")).token
    }`;
  }

  return req;
});

axios.defaults.withCredentials = true;

// Authentication
export const register = (userData) =>
  axios.post(`${url}/user/register`, userData);

export const login = (user) => axios.post(`${url}/user/login`, user);

const removeCookie = (key, value) => {
  if (window !== undefined) {
    Cookies.remove(key, { path: "/" });
  }
};

export const logout = async () => {
  await axios({
    method: "GET",
    url: `${url}/user/logout`,
    withCredentials: true,
  }).then(() => {
    removeCookie("jwt");
    localStorage.clear();
  });
  // .catch((err) => console.log(err));

  window.location = "/";
};

// User
export const getUser = (id) => axios.get(`${url}/user/${id}`);
export const getAllUsers = () => axios.get(`${url}/user`);
export const updateUser = (id, user) => axios.patch(`${url}/user/${id}`, user);

// Paroisse
export const createParoisse = (data) => axios.post(`${url}/paroisse/`, data);
export const updateParoisse = (id, data) =>
  axios.patch(`${url}/paroisse/${id}`, data);
export const deleteParoisse = (id) => axios.delete(`${url}/paroisse/${id}`);
export const chooseParoisse = (id, userId) =>
  axios.patch(`${url}/paroisse/choose-paroisse/${id}`, { userId });

export const unchooseParoisse = (id, userId) =>
  axios.patch(`${url}/paroisse/unchoose-paroisse/${id}`, { userId });

export const getParoisses = () => axios.get(`${url}/paroisse`);
export const getParoisse = (id) => axios.get(`${url}/paroisse/${id}`);

// Clergy
export const addPriest = (id, data) =>
  axios.patch(`${url}/add-clergy/${id}`, data);

export const removePriest = (id, data) =>
  axios.patch(`${url}/remove-clergy/${id}`, data);

// Event
export const createEvent = (data) => axios.post(`${url}/event`, data);
export const updateEvent = (id, data) =>
  axios.patch(`${url}/event/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${url}/event/${id}`);
export const getAllEvents = () => axios.get(`${url}/event`);
export const getEvent = (id) => axios.get(`${url}/event/${id}`);
export const getPremiumEvents = () => axios.get(`${url}/event/premium-events`);
export const getOthersEvents = () => axios.get(`${url}/event/others-events`);

// Actu
export const createActu = (data) => axios.post(`${url}/actus`, data);
export const removeActu = (id) => axios.delete(`${url}/actus/${id}`);
export const updateActu = (id, data) => axios.patch(`${url}/actus/${id}`, data);
export const getAllActus = () => axios.get(`${url}/actus`);
export const getActu = (id) => axios.get(`${url}/actus/${id}`);
export const getActusById = (id) => axios.get(`${url}/actus/paroisse/${id}`);

// Paroisses à proximité
export const getNearParoisses = (coords) =>
  axios.get(`${url}/paroisses/${coords}`);

// Messes
export const addMesses = (id, data) =>
  axios.patch(`${url}/paroisse/add-messe/${id}`, data);
export const removeMesse = (id, messeId) =>
  axios.patch(`${url}/paroisse/remove-messe/${id}`, messeId);

// Confessions
export const addConfessions = (id, data) =>
  axios.patch(`${url}/paroisse/add-confession/${id}`, data);
export const removeConfessions = (id, confessionId) =>
  axios.patch(`${url}/paroisse/remove-confession/${id}`, confessionId);

// Demandes
export const addDemande = (data) => axios.post(`${url}/demandes`, data);
export const updateDemande = (id) => axios.patch(`${url}/demandes/${id}`);
export const getDemandsByParoisse = (id) =>
  axios.get(`${url}/demandes/paroisse`, id);
export const getDemand = (id) => axios.get(`${url}/demandes/${id}`);
