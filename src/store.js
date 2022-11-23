import { createStore, combineReducers, applyMiddleware } from "redux";
import axios from "axios";
import reducer1 from "./redux/reducer1";
import reducer2 from "./redux/reducer2";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const reducer = combineReducers(reducer1, reducer2);

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument({ axios }), createLogger())
);

export default store;
