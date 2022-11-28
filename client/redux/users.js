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
export const fetchUser = (id) => async (dispatch) => {
  try {
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
