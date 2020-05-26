import actions from "../actions/payments";

const initialState = {
  isDoingPayment: false,
  payment: null,
  paymentSuccess: false,
};

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.DO_PAYMENT_REQUEST:
      return {
        ...state,
        isDoingPayment: true,
      };
    case actions.DO_PAYMENT_FAILED:
      return {
        ...state,
        isDoingPayment: false,
        paymentSuccess: true,
      };
    case actions.DO_PAYMENT_SUCCESS:
      return {
        ...state,
        isDoingPayment: false,
        payment: action.payment,
        paymentSuccess: true,
      };
    default:
      return state;
  }
}
