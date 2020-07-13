import actions from "../actions/coupons";

const initialState = {
  coupon: null,
  loadingCoupon: false,
};

export default function couponsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_COUPON_REQUEST:
      return {
        ...state,
        coupon: null,
        loadingCoupon: true,
      };
    case actions.GET_COUPON_FAILED:
      return {
        ...state,
        loadingCoupon: false,
      };
    case actions.GET_COUPON_SUCCESS:
      return {
        ...state,
        coupon: action.coupon || "not-valid",
        loadingCoupon: false,
      };
    default: {
      return state;
    }
  }
}
