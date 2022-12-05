import axios from "axios";
import { logout } from "./auth";

// Cookie functions:
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//action types
const SET_USER = "SET_USER";
const GET_ALL_USERS = "GET_ALL_USERS";
const GET_USERS_ON_TRIP = "GET_USERS_ON_TRIP";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const setAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const setUsersOnTrip = (usersOnTrip) => {
  return {
    type: GET_USERS_ON_TRIP,
    usersOnTrip,
  };
};
const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

//thunks
export const fetchUser = () => async (dispatch) => {
  try {
    const id = getCookie("userId");
    const token = getCookie("token");
    const { data: user } = await axios.get(`/api/users/${id}`, {
      headers: { authorization: token },
    });
    dispatch(setUser(user));
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      const { data: users } = await axios.get(`api/users`, {
        headers: { authorization: token },
      });
      dispatch(setAllUsers(users));
    } catch (error) {
      console.log("no token");
      console.log.error(error);
    }
  };
};

export const fetchAllUsersOnTrip = (tripId) => {
  return async (dispatch) => {
    try {
      const { data: usersOnTrip } = await axios.get(`/api/userTrips/${tripId}`);
      dispatch(setUsersOnTrip(usersOnTrip));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatingUser = (info) => async (dispatch) => {
  try {
    const id = getCookie("userId");
    const token = getCookie("token");
    const { data: user } = await axios.put(`/api/users/${id}/update`, info, {
      headers: { authorization: token },
    });
    dispatch(updateUser(user));
  } catch (error) {
    return dispatch(updateUser({ error: error }));
  }
};

export const deletingUser = () => async (dispatch) => {
  try {
    const id = getCookie("userId");
    const token = getCookie("token");
    const { data: user } = await axios.delete(`/api/users/${id}`, {
      headers: {
        authorization: token,
      },
    });
    logout();
    dispatch(deleteUser());
  } catch (error) {
    console.error(error);
  }
};

const initialState = { allUsers: [], usersOnTrip: [] };
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, allUsers: action.user };
    case GET_ALL_USERS:
      return { ...state, allUsers: action.users };
    case GET_USERS_ON_TRIP:
      return { ...state, usersOnTrip: action.usersOnTrip };
    case UPDATE_USER:
      return { ...state, allUsers: action.users };
    case DELETE_USER:
      return { ...state, allUsers: action.users };
    default:
      return state;
  }
};

export default usersReducer;
