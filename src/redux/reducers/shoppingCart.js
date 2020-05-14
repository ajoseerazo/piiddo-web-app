import { Map } from "immutable";
import actions from "../actions/shoppingCart";

const initialState = new Map({
  items: [],
});

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      const oldItems = state.get("items");

      return state.set("items", oldItems.concat([action.order]));
    case actions.REMOVE_FROM_CART:
      return state;
    default:
      return state;
  }
}
