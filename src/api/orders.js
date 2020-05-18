import firebase, { db } from "../config/firebase"

class Orders {
  static create = async (order) => {
    const orderRef = await db.collection("orders").add({
      ...order,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      paymentStatus: 'PENDING',
      status: 'CREATED'
    });

    return orderRef.id;
  }
}

export default Orders;