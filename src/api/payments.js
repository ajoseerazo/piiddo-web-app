import { PAYMENT_GATEWAY_URL } from "../config/constants";

class Payments {
  static payWithCreditCard = async ({ card, amount, bill }) => {
    return fetch(`${PAYMENT_GATEWAY_URL}/payment-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card,
        amount,
        bill,
      }),
    }).then((res) => res.json());
  };
}

export default Payments;