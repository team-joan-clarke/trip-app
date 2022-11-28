import { createStore, combineReducers, applyMiddleware } from "redux";
import axios from "axios";
import usersReducer from "./redux/users";
import reducer2 from "./redux/reducer2";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const reducer = combineReducers({ users: usersReducer, reducer2 });

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument({ axios }), createLogger())
);

export default store;
