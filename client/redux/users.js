import axios from "axios";

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
export const fetchUser = (id) => {
  return async (dispatch) => {
    const { data: user } = axios.get(`/api/users/${id}`);
    dispatch(setUser(user));
  };
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return state.users;
    default:
      return state;
  }
};

export default usersReducer;
