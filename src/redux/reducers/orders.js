import { Map } from "immutable";
import actions from "../actions/orders";

const initialState = new Map({
  creatingOrder: false,
  order: null,
  orderCreated: false,
  settingPaymentSupport: false,
  paymentSupportSent: false,
});

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_ORDER_REQUEST:
      return state
        .set("creatingOrder", true)
        .set("order", null)
        .set("orderCreated", false)
        .set("paymentSupportSent", false);
    case actions.CREATE_ORDER_FAILED:
      return state.set("creatingOrder", false).set("orderCreated", false);
    case actions.CREATE_ORDER_SUCCESS:
      return state
        .set("creatingOrder", false)
        .set("order", {
          id: action.order,
        })
        .set("orderCreated", true);
    case actions.SET_ORDER_PAYMENT_SUPPORT_REQUEST:
      return state
        .set("settingPaymentSupport", true)
        .set("paymentSupportSent", false);
    case actions.SET_ORDER_PAYMENT_SUPPORT_FAILED:
      return state.set("settingPaymentSupport", false);
    case actions.SET_ORDER_PAYMENT_SUPPORT_SUCCESS:
      return state
        .set("settingPaymentSupport", false)
        .set("paymentSupportSent", true);
    default:
      return state;
  }
}
