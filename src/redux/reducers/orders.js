import actions from "../actions/orders";

const initialState = {
  creatingOrder: false,
  order: null,
  orderCreated: false,
  settingPaymentSupport: false,
  paymentSupportSent: false,
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_ORDER_REQUEST:
      return {
        ...state,
        creatingOrder: true,
        order: null,
        orderCreated: false,
        paymentSupportSent: false,
      };
    case actions.CREATE_ORDER_FAILED:
      return {
        ...state,
        creatingOrder: false,
        orderCreated: false,
      };
    case actions.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        creatingOrder: false,
        order: {
          id: action.order,
        },
        orderCreated: true,
      };
    case actions.SET_ORDER_PAYMENT_SUPPORT_REQUEST:
      return {
        ...state,
        settingPaymentSupport: true,
        paymentSupportSent: false,
      };
    case actions.SET_ORDER_PAYMENT_SUPPORT_FAILED:
      return {
        ...state,
        settingPaymentSupport: false,
      };
    case actions.SET_ORDER_PAYMENT_SUPPORT_SUCCESS:
      return {
        ...state,
        settingPaymentSupport: false,
        paymentSupportSent: true,
      };
    default:
      return state;
  }
}
