import { Map } from "immutable";
import actions from "../actions/products";

const initialState = new Map({
  products: null,
  extras: null,
  companions: null,
  isLoading: false,
  product: null,
  isLoadingProduct: false,
});

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_REQUEST:
      return state.set("isLoading", true);
    case actions.GET_ALL_FAIL:
      return state.set("isLoading", false);
    case actions.GET_ALL_SUCCESS:
      return state
        .set("products", action.products[0])
        .set("extras", action.products[1])
        .set("companions", action.products[2])
        .set("isLoading", true);
    case actions.SELECT_PRODUCT:
      return state.set("product", action.product);
    case actions.GET_PRODUCT_REQUEST:
      return state.set("isLoadingProduct", true);
    case actions.GET_PRODUCT_SUCCESS:
      return state
        .set("isLoadingProduct", false)
        .set("product", action.product);
    case actions.GET_PRODUCT_FAIL:
      return state.set("isLoadingProduct", false);
    default:
      return state;
  }
}
