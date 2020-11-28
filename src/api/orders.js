import firebase, { db } from "../config/firebase";

class Orders {
  static create = async (order) => {
    console.log(order);

    const orderRef =
      order.type !== "piiddo-go"
        ? await db.collection("orders").add({
            ...order,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            paymentStatus: order.paymentStatus || "PENDING",
            status: "CREATED",
          })
        : await db.collection("rides").add({
            ...order,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            paymentStatus: order.paymentStatus || "PENDING",
            status: "CREATED",
          });

    return orderRef.id;
  };

  static setPaymentSupport = async (orderId, url) => {
    await db.collection("orders").doc(orderId).update({
      paymentSupportURL: url,
      paymentStatus: "PAYMENT_SUPPORT_SENT",
    });
  };
}

export default Orders;
