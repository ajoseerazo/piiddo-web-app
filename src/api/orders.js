import firebase, { db } from "../config/firebase";

class Orders {
  static create = async (order) => {
    const orderRef = await db.collection("orders").add({
      ...order,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      paymentStatus: "PENDING",
      status: "CREATED",
    });

    return orderRef.id;
  };

  static setPaymentSupport = async (orderId, url) => {
    console.log(orderId);
    console.log(url);
    await db.collection("orders").doc(orderId).update({
      paymentSupportURL: url,
      paymentStatus: 'PAYMENT_SUPPORT_SENT'
    });
  };
}

export default Orders;
