import firebase, { db } from '../config/firebase';

class Products {
  static getAll = async (category, isOcassion) => {
    let productsRef 

    if (category) {
      if (isOcassion) {
        productsRef = await db.collection("products").where("ocassion", "array-contains", category).get();
      } else {
        productsRef = await db.collection("products").where("category", "==", category).get();
      }
    } else {
      productsRef = await db.collection("products").get();
    }

    const products = productsRef.docs.map(product => {
      return {
        id: product.id,
        ...product.data()
      }
    });

    return products;
  }

  static get = async (id) => {
    const productRef = await db.collection("products").doc(id).get();

    return {
      id: productRef.id,
      ...productRef.data()
    }
  }
}

export default {
  Products
}