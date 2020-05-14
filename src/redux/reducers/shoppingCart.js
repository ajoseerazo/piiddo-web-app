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
      const newItems = [];

      for (let i = 0; i < state.get("items").length; i++) {
        if (i !== action.index) {
          newItems.push(state.get("items")[i])
        }
      }

      return state.set("items", newItems);
    case actions.CHANGE_COUNT:
      const newOrder = state.get("items")[action.index];

      const newOrdersUpdated = [];

      if (newOrder) {
        for (let i = 0; i < state.get("items").length; i++) {
          if (i !== action.index) {
            newOrdersUpdated.push(state.get("items")[i])
          } else {
            newOrder.count = action.count;
            newOrder.totalAmount = newOrder.basePrice * action.count;

            newOrdersUpdated.push(newOrder);
          }
        }
  
        return state.set("items", newOrdersUpdated);
      } else {
        return state;
      }
    default:
      return state;
  }
}
