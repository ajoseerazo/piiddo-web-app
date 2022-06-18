import API from "../../api";

const paymentsActions = {
  DO_PAYMENT_REQUEST: "DO_PAYMENT_REQUEST",
  DO_PAYMENT_SUCCESS: "DO_PAYMENT_SUCCESS",
  DO_PAYMENT_FAILED: "DO_PAYMENT_FAILED",
  doingPayment: () => {
    return {
      type: paymentsActions.DO_PAYMENT_REQUEST,
    };
  },
  doPaymentSuccess: (payment) => {
    return {
      type: paymentsActions.DO_PAYMENT_SUCCESS,
      payment,
    };
  },
  doPaymentFailed: (error) => {
    return {
      type: paymentsActions.DO_PAYMENT_FAILED,
      error,
    };
  },
  doPayment: ({ card, amount, bill, cardType }) => {
    return async (dispatch) => {
      try {
        dispatch(paymentsActions.doingPayment());

        const payment = await API.Payments.payWithCreditCard({
          card,
          amount,
          bill,
          cardType
        });

        dispatch(paymentsActions.doPaymentSuccess(payment));

        return payment;
      } catch (err) {
        console.log(err);

        dispatch(paymentsActions.doPaymentFailed(err));
      }
    };
  },
};

export default paymentsActions;