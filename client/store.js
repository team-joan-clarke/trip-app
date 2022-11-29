import { createStore, combineReducers, applyMiddleware } from "redux";
import axios from "axios";
import usersReducer from "./redux/users";
// import tripReducer from "./redux/tripReducer";
import taskReducer from "./redux/taskReducer";
import auth from "./redux/auth";
import reducer2 from "./redux/reducer2";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const reducer = combineReducers({
  users: usersReducer,
  // trips: tripReducer,
  tasks: taskReducer,
  reducer2,
  auth,
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument({ axios }), createLogger())
);

export default store;
