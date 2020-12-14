import moment from "moment";
import firebase from "firebase";
import { getDistance } from "geolib";

const IVA = 0.16;

const DOLLAR_CORRECTION = 0.05;

export const getCategoryName = (category) => {
  if (!category) return "Todos";
  if (category === "para-cumpleanos") return "Para Cumpleaños";
  if (category === "para-mi-novix") return "Para Mi Novi@";
  return category.replace(/\-/g, " ");
};

export const getCurrencyCode = (currency) => {
  switch (currency) {
    default:
      return "COP";
  }
};

const METER_VALUE = 0.0005;
const MIN_DISTANCE_IN_METERS = 1500;

const peakTimeRange = ["10:00", "13:00"];

export function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

export const calculatePrice = (distance) => {
  const baseMin = moment(peakTimeRange[0], "HH:mm");
  const baseMax = moment(peakTimeRange[1], "HH:mm");

  const dynamicBase =
    moment().isAfter(baseMin) && moment().isBefore(baseMax) ? 0 : 0;

  if (distance <= MIN_DISTANCE_IN_METERS) {
    const basePrice = dynamicBase + 1;

    return basePrice + basePrice * IVA;
  } else {
    const p = distance * METER_VALUE + 0.25;
    return p + p * IVA;
  }
};

export const calculatePriceFromPoints = (source, target) => {
  const distance = getDistance(
    { latitude: source.lat, longitude: source.lng },
    { latitude: target.lat, longitude: target.lng }
  );

  return round(calculatePrice(distance), 2);
};

export const getDataFromShoppingCart = (stores, deliveryLocation) => {
  let length = 0;
  let total = 0;
  let deliveryTotal = 0;

  if (stores) {
    for (let key in stores) {
      length =
        length +
        stores[key].items.reduce((a, b) => {
          return a + b.count;
        }, 0);

      const totalStore = stores[key].items.reduce((a, b) => {
        return a + b.totalAmount;
      }, 0);

      total = total + totalStore;

      let totalDeliveryStore = 0;

      if (deliveryLocation && deliveryLocation.lat && deliveryLocation.lng) {
        totalDeliveryStore = calculatePriceFromPoints(
          deliveryLocation,
          stores[key].location
        );

        deliveryTotal = deliveryTotal + totalDeliveryStore;
      }

      const finalTotalStore = stores[key].items.reduce((a, b) => {
        return a + b.totalStoreAmount;
      }, 0);

      stores[key].totalDetails = {
        total: totalStore,
        totalStore: finalTotalStore,
        delivery: totalDeliveryStore,
      };
    }
  }

  return [length, total, deliveryTotal];
};

export const askForPermissionToReceiveNotifications = async (callback) => {
  try {
    const messaging = firebase.messaging();

    messaging.usePublicVapidKey(
      "BMgNayp7MoTXVElfNy2KYT2_nh9iJBB4bnzfdts2m_MIaw93DG4wdOdgvCSuUorWN_b8RxlA6f_GBRWkGYUFzxc"
    );

    await messaging.requestPermission();
    const token = await messaging.getToken();

    if (token) {
      messaging.onMessage(function (payload) {
        // console.log('Message received. ', payload);
        // callback(payload)
      });
    }
    return token;
  } catch (error) {
    console.error("Error", error);
  }
};

export const getPrice = (partner, basePrice) => {
  const _price = !partner.commisionIncluded
    ? partner.commision
      ? parseFloat(basePrice) +
        parseFloat(basePrice) * (partner.commision + 0.1)
      : basePrice
    : basePrice;
  return _price + _price * DOLLAR_CORRECTION;
};

export const normalizeProduct = (p, partner) => {
  const product = p;

  if (product.extras) {
    let finalExtras = product.extras.map((extra) => {
      return {
        ...extra,
        finalPrice: getPrice(partner, extra.usdPrice),
      };
    });

    product.extras = finalExtras;
  }

  if (product.companions) {
    let finalCompanions = product.companions.map((companion) => {
      return {
        ...companion,
        finalPrice: getPrice(partner, companion.usdPrice),
      };
    });

    product.companions = finalCompanions;
  }

  if (product.variations) {
    let finalVariations = product.variations.map((variation) => {
      return {
        ...variation,
        options: variation.options.map((option) => {
          return {
            ...option,
            finalPrice: getPrice(partner, parseFloat(option.price)),
          };
        }),
      };
    });

    product.variations = finalVariations;
  }

  product.finalPrice = getPrice(partner, product.usdPrice);

  return product;
};
