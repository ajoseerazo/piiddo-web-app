import actions from "../actions/app";
import Cookies from "cookies-js";

const initialState = {
  cop_rate: 3500,
  usd_rate: 1,
  eu_rate: 0.9,
  currency: "colombia",
  rate: 3500,
  currency_code: "COP",
  city: null
};

const getRate = (state, currency) => {
  switch (currency) {
    case "colombia":
      return state.cop_rate;
    case "usa":
      return state.usd_rate;
    case "europa":
      return state.eu_rate;
    default:
      return state.cop_rate;
  }
};

const currencyAbbr = (currency) => {
  switch (currency) {
    case "colombia":
      return "COP";
    case "usa":
      return "USD";
    case "europa":
      return "EUR";
    default:
      return "co";
  }
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SELECT_CURRENCY:
      return {
        ...state,
        currency: action.currency,
        rate: getRate(state, action.currency),
        currency_code: currencyAbbr(action.currency),
      };
    case actions.SELECT_CITY:
      Cookies.set("city", action.city);

      return {
        ...state,
        city: action.city,
      };
    case actions.INIT_APP:
      const city = Cookies.get("city");

      return {
        ...state,
        city
      }
    case actions.LOGOUT: 
      return {
        ...state
      }
    default:
      return state;
  }
};

export default appReducer;
