import firebase, { db } from "../config/firebase";
import Categories from "./categories";
import Cookies from "cookies-js";
import Orders from "./orders";
import Payments from "./payments";
import algoliasearch from "algoliasearch/lite";
import moment from "moment";

const client = algoliasearch("VIM0LCZXZS", "92d89fdcbec4d67d6613a28560459d56");
const productsIndex = client.initIndex("products");
const storesIndex = client.initIndex("stores");

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
      const data = product.data();
      delete data.createdAt;
      delete data.updatedAt;

      return {
        id: product.id,
        ...data,
      };
    });

    const productsSorted = products.sort((a, b) => {
      let ap = a.order ? a.order : 1000;
      let bp = b.order ? b.order : 1000;

      if (ap > bp) {
        return 1;
      }

      return -1;
    });

    return productsSorted;
  };

  static get = async (id) => {
    const productRef = await db.collection("products").doc(id).get();

    const data = productRef.data();
    delete data.createdAt;
    delete data.updatedAt;

    return {
      id: productRef.id,
      ...data,
    };
  };

  static search = async (searchText) => {
    const { hits } = await productsIndex.search(searchText, {
      hitsPerPage: 30,
    });

    return hits;
  };
}

class Partners {
  static getAll = async (city, category, subCategory) => {
    let partnersRef;

    if (category) {
      if (!subCategory) {
        partnersRef = await db
          .collection("partners")
          .where("mainCategory", "==", category)
          .where("city", "==", city)
          .where("enabled", "==", true)
          .orderBy("priority", "desc")
          .get();
      } else {
        partnersRef = await db
          .collection("partners")
          .where("mainCategory", "==", category)
          .where("city", "==", city)
          .where("categories", "array-contains", subCategory)
          .where("enabled", "==", true)
          .orderBy("priority", "desc")
          .get();
      }
    } else {
      partnersRef = await db
        .collection("partners")
        .where("enabled", "==", true)
        .orderBy("priority", "desc")
        .get();
    }

    const partners = partnersRef.docs.map((p) => {
      const data = p.data();
      delete data.createdAt;
      delete data.updatedAt;

      if (data.location) {
        data.location = {
          lat: data.location.latitude,
          lng: data.location.longitude,
        };
      }

      return {
        id: p.id,
        ...data,
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
      const data = partnersRef.docs[0].data();

      if (data.location) {
        data.location = {
          lat: data.location.latitude,
          lng: data.location.longitude,
        };
      }

      delete data.createdAt;
      delete data.updatedAt;

      return {
        id: partnersRef.docs[0].id,
        ...data,
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
      const data = catalogRef.docs[0].data();
      delete data.createdAt;
      catalog = {
        id: catalogRef.docs[0].id,
        ...data,
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
      const data = cat.data();
      delete data.createdAt;

      return {
        id: cat.id,
        ...data,
      };
    });

    const categoriesSorted = categories.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }

      return -1;
    });

    return categoriesSorted;
  };

  static search = async (searchText) => {
    console.log(searchText);

    const { hits } = await storesIndex.search(searchText, {
      hitsPerPage: 30,
    });

    console.log(hits);

    return hits;
  };
}

class DeliveryLocation {
  static get() {
    if (typeof window === "undefined") {
      return null;
    }

    const address = Cookies.get("deliveryAddress");
    const location = Cookies.get("deliveryLocation");

    return {
      address,
      location: location ? JSON.parse(location) : null,
    };
  }

  static set = async (address, location) => {
    Cookies.set("deliveryAddress", address, {
      expires: moment().add(1, "year").toDate(),
    });
    Cookies.set("deliveryLocation", JSON.stringify(location), {
      expires: moment().add(1, "year").toDate(),
    });
  };
}

class Coupons {
  static get = async (code) => {
    const couponsRef = await db
      .collection("coupons")
      .where("code", "==", code)
      .where("expireAt", ">", new Date())
      .get();

    if (couponsRef.size === 1) {
      const couponRef = couponsRef.docs[0];

      return {
        id: couponRef.id,
        ...couponRef.data(),
      };
    }

    return null;
  };
}

class Auth {
  static logout = async () => {
    await firebase.auth().signOut();
  };
}

export default {
  Products,
  Partners,
  Categories,
  DeliveryLocation,
  Orders,
  Payments,
  Auth,
  Coupons,
};
