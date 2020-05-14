import { combineReducers } from 'redux'
import Products from "./reducers/products"
import Partners from "./reducers/partners";
import App from "./reducers/app";
import Categories from "./reducers/categories";
import ShoppingCart from "./reducers/shoppingCart";

const rootReducer = combineReducers({
  Products,
  Partners,
  App,
  Categories,
  ShoppingCart
})

export default rootReducer