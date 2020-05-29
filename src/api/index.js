import firebase, { db } from "../config/firebase";
import Categories from "./categories";
import Cookies from "cookies-js";
import Orders from "./orders";
import Payments from "./payments";
import { getDistance } from "geolib";
import { calculatePrice, round } from "../utils";

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

      return {
        id: product.id,
        ...data,
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

    const place = DeliveryLocation.get();

    const partners = partnersRef.docs.map((p) => {
      const data = p.data();
      if (data.location) {
        data.location = {
          lat: data.location.latitude,
          lng: data.location.longitude,
        };

        if (place) {
          const distance = getDistance(
            { latitude: place.location.lat, longitude: place.location.lng },
            { latitude: data.location.lat, longitude: data.location.lng }
          );

          data.distance = distance / 1000;
          data.deliveryPrice = round(calculatePrice(distance), 1);
        }
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

    return categories;
  };
}

class DeliveryLocation {
  static get() {
    if (typeof window === "undefined") {
      return {}
    }
    
    const address = Cookies.get("deliveryAddress");
    const location = Cookies.get("deliveryLocation");

    return {
      address,
      location: location ? JSON.parse(location) : null,
    };
  }

  static set = async (address, location) => {
    Cookies.set("deliveryAddress", address);
    Cookies.set("deliveryLocation", JSON.stringify(location));
  };
}

export default {
  Products,
  Partners,
  Categories,
  DeliveryLocation,
  Orders,
  Payments,
};
