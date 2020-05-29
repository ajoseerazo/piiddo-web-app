import moment from "moment";
import { getDistance } from "geolib";

export const getCategoryName = (category) => {
  if (!category) return "Todos";
  if (category === 'para-cumpleanos') return "Para Cumpleaños"
  if (category === 'para-mi-novix') return "Para Mi Novi@"
  return category.replace(/\-/g, ' ')
}

export const getCurrencyCode = (currency) => {
  switch (currency) {
    default:
      return "COP"
  }
}

const METER_VALUE = 0.00035;
const MIN_DISTANCE_IN_METERS = 1500;

const peakTimeRange = ["10:00", "13:00"];

export function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export const calculatePrice = distance => {
  const baseMin = moment(peakTimeRange[0], "HH:mm");
  const baseMax = moment(peakTimeRange[1], "HH:mm");

  const dynamicBase = moment().isAfter(baseMin) && moment().isBefore(baseMax) ? 0 : 0;

  if (distance <= MIN_DISTANCE_IN_METERS) {
    const basePrice = dynamicBase + 0.5

    return basePrice;
  } else {
    const p = distance * METER_VALUE;
    return p;
  }
}

export const calculatePriceFromPoints = (source, target) => {
  const distance = getDistance(
    { latitude: source.lat, longitude: source.lng },
    { latitude: target.lat, longitude: target.lng }
  );

  return round(calculatePrice(distance), 1);
}