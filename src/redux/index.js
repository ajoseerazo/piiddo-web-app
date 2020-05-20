import { combineReducers } from "redux";
import Products from "./reducers/products";
import Partners from "./reducers/partners";
import App from "./reducers/app";
import Categories from "./reducers/categories";
import ShoppingCart from "./reducers/shoppingCart";
import Location from "./reducers/location";
import Orders from "./reducers/orders";
import Payments from "./reducers/payments";

const rootReducer = combineReducers({
  Products,
  Partners,
  App,
  Categories,
  ShoppingCart,
  Location,
  Orders,
  Payments
});

export default rootReducer;
