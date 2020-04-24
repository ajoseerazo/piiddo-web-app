import firebase, { db } from "../config/firebase";
import Categories from "./categories";

class Products {
  static getAll = async (category, isOcassion) => {
    let productsRef;

    if (category) {
      if (isOcassion) {
        productsRef = await db
          .collection("products")
          .where("ocassion", "array-contains", category)
          .get();
      } else {
        productsRef = await db
          .collection("products")
          .where("category", "==", category)
          .get();
      }
    } else {
      productsRef = await db.collection("products").get();
    }

    const products = productsRef.docs.map((product) => {
      return {
        id: product.id,
        ...product.data(),
      };
    });

    return products;
  };

  static get = async (id) => {
    const productRef = await db.collection("products").doc(id).get();

    return {
      id: productRef.id,
      ...productRef.data(),
    };
  };
}

class Partners {
  static getAll = async (category, subCategory) => {
    let partnersRef;

    if (category) {
      if (!subCategory) {
        partnersRef = await db
          .collection("partners")
          .where("mainCategory", "==", category)
          .get();
      } else {
        partnersRef = await db
          .collection("partners")
          .where("mainCategory", "==", category)
          .where("categories", "array-contains", subCategory)
          .get();
      }
    } else {
      partnersRef = await db.collection("partners").get();
    }

    const partners = partnersRef.docs.map((p) => {
      return {
        id: p.id,
        ...p.data(),
      };
    });

    return partners;
  };

  static getBySlug = async (slug) => {
    const partnersRef = await db
      .collection("partners")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (partnersRef.docs.length) {
      return {
        id: partnersRef.docs[0].id,
        ...partnersRef.docs[0].data(),
      }
    } else {
      return null;
    }
  };
}

export default {
  Products,
  Partners,
  Categories,
};
