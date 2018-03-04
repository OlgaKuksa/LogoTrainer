import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
/*
const logger = ({ dispatch, getState }) => next => action => {
  console.log({ state: getState(), action });
  return next(action);
};

const store = createStore(reducers, applyMiddleware(thunk, logger));
*/
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
