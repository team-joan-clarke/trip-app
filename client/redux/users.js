import axios from "axios";

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

//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

//thunks
export const fetchUser = (id) => async (dispatch) => {
  try {
    setCookie("user", id, 1);
    const { data: user } = await axios.get(`/api/users/${id}`);
    dispatch(setUser(user));
  } catch (error) {
    throw error;
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export default usersReducer;