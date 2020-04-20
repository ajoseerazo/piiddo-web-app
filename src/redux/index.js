import { combineReducers } from 'redux'
import Products from "./reducers/products"
import Partners from "./reducers/partners";
import App from "./reducers/app";
import Categories from "./reducers/categories";

const rootReducer = combineReducers({
  Products,
  Partners,
  App,
  Categories
})

export default rootReducer