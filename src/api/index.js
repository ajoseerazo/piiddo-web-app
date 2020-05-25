import firebase, { db } from "../config/firebase";
import Categories from "./categories";
import Cookies from "cookies-js";
import Orders from "./orders";
import Payments from "./payments";

class Products {
  static getAll = async (parentId, type = "partner") => {
    let productsRef;

    if (type === "partner") {
      productsRef = await db
        .collection("products")
        .where("partnersId", "array-contains", parentId)
        .get();
    } else {
      if (type === "catalog") {
        productsRef = await db
          .collection("products")
          .where("catalog", "==", parentId)
          .get();
      }
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
      const data = p.data();
      delete data.location;

      return {
        id: p.id,
        ...data,
      };
    });

    console.log(partners);

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
      };
    } else {
      return null;
    }
  };

  static getCatalog = async (partnerId) => {
    const catalogRef = await db
      .collection("catalog")
      .where("partnersId", "array-contains", partnerId)
      .limit(1)
      .get();

    let catalog = null;

    if (catalogRef.docs.length) {
      catalog = {
        id: catalogRef.docs[0].id,
        ...catalogRef.docs[0].data(),
      };
    }

    return catalog;
  };

  static getCatalogCategories = async (catalogId) => {
    const categoriesRef = await db
      .collection("catalogCategories")
      .where("catalogId", "==", catalogId)
      .get();

    let categories = categoriesRef.docs.map((cat) => {
      return {
        id: cat.id,
        ...cat.data(),
      };
    });

    return categories;
  };
}

class DeliveryLocation {
  static get() {
    const address = Cookies.get("deliveryAddress");
    const location = Cookies.get("deliveryLocation");

    return {
      address,
      location,
    };
  }
}

export default {
  Products,
  Partners,
  Categories,
  DeliveryLocation,
  Orders,
  Payments,
};
