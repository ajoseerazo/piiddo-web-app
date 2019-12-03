import firebase, { db } from '../config/firebase';

class Products {
  static getAll = async () => {
    const productsRef = await db.collection("products").get();

    const products = productsRef.docs.map(product => {
      return {
        id: product.id,
        ...product.data()
      }
    });

    return products;
  }
}

export default {
  Products
}