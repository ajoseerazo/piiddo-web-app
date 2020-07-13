import API from "../../api";

const couponsActions = {
  GET_COUPON_REQUEST: "GET_COUPON_REQUEST",
  GET_COUPON_SUCCESS: "GET_COUPON_SUCCESS",
  GET_COUPON_FAILED: "GET_COUPON_FAILED",
  gettingCoupon: () => {
    return {
      type: couponsActions.GET_COUPON_REQUEST,
    };
  },
  getCouponSuccess: (coupon) => {
    return {
      type: couponsActions.GET_COUPON_SUCCESS,
      coupon,
    };
  },
  getCouponFailed: (error) => {
    return {
      type: couponsActions.GET_COUPON_FAILED,
      error,
    };
  },
  getCoupon: (code) => {
    return async (dispatch) => {
      try {
        dispatch(couponsActions.gettingCoupon());

        const coupon = await API.Coupons.get(code);

        dispatch(couponsActions.getCouponSuccess(coupon));
      } catch (error) {
        console.log(error);

        dispatch(couponsActions.getCouponFailed(error));
      }
    };
  },
};

export default couponsActions;
