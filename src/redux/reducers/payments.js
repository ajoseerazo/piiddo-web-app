import { Map } from "immutable";
import actions from "../actions/payments";

const initialState = new Map({
  isDoingPayment: false,
  payment: null,
  paymentSuccess: false,
});

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.DO_PAYMENT_REQUEST:
      return state.set("isDoingPayment", true);
    case actions.DO_PAYMENT_FAILED:
      return state.set("isDoingPayment", false).set("paymentSuccess", true);
    case actions.DO_PAYMENT_SUCCESS:
      return state
        .set("isDoingPayment", false)
        .set("payment", action.payment)
        .set("paymentSuccess", true);
    default:
      return state;
  }
}
