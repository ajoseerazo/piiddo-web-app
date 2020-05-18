import API from "../../api/index";

const ordersActions = {
  CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST",
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",
  CREATE_ORDER_FAILED: "CREATE_ORDER_FAILED",
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
    console.log(orderData);

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
};

export default ordersActions;
