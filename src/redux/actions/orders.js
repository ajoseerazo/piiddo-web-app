import API from "../../api/index";

const ordersActions = {
  CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST",
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",
  CREATE_ORDER_FAILED: "CREATE_ORDER_FAILED",
  SET_ORDER_PAYMENT_SUPPORT_REQUEST: "SET_ORDER_PAYMENT_SUPPORT_REQUEST",
  SET_ORDER_PAYMENT_SUPPORT_SUCCESS: "SET_ORDER_PAYMENT_SUPPORT_SUCCESS",
  SET_ORDER_PAYMENT_SUPPORT_FAILED: "SET_ORDER_PAYMENT_SUPPORT_FAILED",
  creatingOrder: () => {
    return {
      type: ordersActions.CREATE_ORDER_REQUEST,
    };
  },
  createOrderFailed: (error) => {
    return {
      type: ordersActions.CREATE_ORDER_FAILED,
      error,
    };
  },
  createOrderSuccess: (order) => {
    return {
      type: ordersActions.CREATE_ORDER_SUCCESS,
      order,
    };
  },
  createOrder: (orderData) => {
    return async (dispatch) => {
      try {
        dispatch(ordersActions.creatingOrder());

        const order = await API.Orders.create(orderData);

        dispatch(ordersActions.createOrderSuccess(order));

        return order;
      } catch (error) {
        console.log(error);

        dispatch(ordersActions.createOrderFailed(error));
      }
    };
  },
  settingOrderPaymentSupport: () => {
    return {
      type: ordersActions.SET_ORDER_PAYMENT_SUPPORT_REQUEST
    }
  },
  setOrderPaymentSupportFailed: (error) => {
    return {
      type: ordersActions.SET_ORDER_PAYMENT_SUPPORT_FAILED,
      error
    }
  },
  setOrderPaymentSupportSuccess: () => {
    return {
      type: ordersActions.SET_ORDER_PAYMENT_SUPPORT_SUCCESS
    }
  },
  setOrderPaymentSupport: (orderId, url) => {
    return async (dispatch) => {
      try {
        dispatch(ordersActions.settingOrderPaymentSupport());

        await API.Orders.setPaymentSupport(orderId, url);

        dispatch(ordersActions.setOrderPaymentSupportSuccess());
      } catch (error) {
        console.log(error);

        dispatch(ordersActions.setOrderPaymentSupportFailed(error));
      }
    };
  }
};

export default ordersActions;
