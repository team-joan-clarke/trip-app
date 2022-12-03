import axios from "axios";
import history from "../history";
import { getCookie, setCookie } from "./users";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const verified = () => async (dispatch) => {
  //using cookies instead of localStorage
  const token = getCookie(TOKEN);
  if (token) {
    const res = await axios.get("/auth/verified", {
      headers: {
        authorization: token,
      },
    });
    //update res.data to protect info
    setCookie("userId", res.data.id, 1);
    return dispatch(setAuth(res.data));
  }
};

export const authenticateLogin = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/login`, { username, password });
    setCookie(TOKEN, res.data.token, 1);
    dispatch(verified());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const authenticateSignUp =
  (firstName, lastName, username, password, email, phoneNumber) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`/auth/signup`, {
        firstName,
        lastName,
        username,
        password,
        email,
        phoneNumber,
      });
      setCookie(TOKEN, res.data.token, 1);
      dispatch(verified());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  setCookie(TOKEN, "", 0);
  setCookie("userId", "", 0);
  history.push("/");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
