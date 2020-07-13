import { combineReducers } from "redux";
import Products from "./products";
import Partners from "./partners";
import App from "./app";
import Categories from "./categories";
import ShoppingCart from "./shoppingCart";
import Location from "./location";
import Orders from "./orders";
import Payments from "./payments";
import Coupons from "./coupons";

const rootReducer = {
  Products,
  Partners,
  App,
  Categories,
  ShoppingCart,
  Location,
  Orders,
  Payments,
  Coupons,
};

export default rootReducer;
