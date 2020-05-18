import { Map } from "immutable";
import actions from "../actions/orders";

const initialState = new Map({
  creatingOrder: false,
  order: null,
});

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_ORDER_REQUEST:
      return state.set("creatingOrder", true).set("order", null);
    case actions.CREATE_ORDER_FAILED:
      return state.set("creatingOrder", false);
    case actions.CREATE_ORDER_SUCCESS:
      return state.set("creatingOrder", false).set("order", {
        id: action.order,
      });
    default:
      return state;
  }
}
