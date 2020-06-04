import moment from "moment";
import firebase from "firebase";
import { getDistance } from "geolib";

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

const METER_VALUE = 0.00035;
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
    const basePrice = dynamicBase + 0.5;

    return basePrice;
  } else {
    const p = distance * METER_VALUE;
    return p;
  }
};

export const calculatePriceFromPoints = (source, target) => {
  const distance = getDistance(
    { latitude: source.lat, longitude: source.lng },
    { latitude: target.lat, longitude: target.lng }
  );

  return round(calculatePrice(distance), 1);
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

      stores[key].totalDetails = {
        total: totalStore,
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
