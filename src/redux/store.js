import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { fromJS } from "immutable";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers(rootReducer);

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    let serverState = {};
    for (let key in action.payload) {
      serverState[key] = fromJS(action.payload[key]);
    }

    const nextState = {
      ...state, // use previous state
      ...serverState, // apply delta from hydration
    };

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
