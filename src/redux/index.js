import { combineReducers } from 'redux'
import Products from "./reducers/products"
import App from "./reducers/app"

const rootReducer = combineReducers({
  Products,
  App
})

export default rootReducer