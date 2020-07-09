import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

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
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    if (state.Categories.categories) {
      nextState.Categories.categories = state.Categories.categories; // preserve count value on client side navigation
    }

    if (state.Orders.order) {
      nextState.Orders.order = state.Orders.order;
    }

    if (state.Location.deliveryAddress) {
      nextState.Location.deliveryAddress = state.Location.deliveryAddress;
    }

    if (state.Location.deliveryLocation) {
      nextState.Location.deliveryLocation = state.Location.deliveryLocation;
    }

    if (Object.keys(state.ShoppingCart.stores).length) {
      nextState.ShoppingCart.stores = state.ShoppingCart.stores;
    }

    if (state.Products.productsResult) {
      nextState.Products.productsResult = state.Products.productsResult;
    }

    if (state.App.city) {
      nextState.App.city = state.App.city;
    }

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
