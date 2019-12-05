import { Map } from "immutable";
import actions from "../actions/app";

const initialState = new Map({
  cop_rate: 3500,
  usd_rate: 1,
  eu_rate: 0.9,
  currency: "colombia",
  rate: 3500,
  currency_code: "COP"
});

const getRate = (state, currency) => {
  switch (currency) {
    case "colombia":
      return state.get("cop_rate");
    case "usa":
      return state.get("usd_rate");
    case "europa":
      return state.get("eu_rate");
    default:
      return state.get("cop_rate");
  }
};

const currencyAbbr = currency => {
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
      return state
        .set("currency", action.currency)
        .set("rate", getRate(state, action.currency))
        .set("currency_code", currencyAbbr(action.currency))
    default:
      return state;
  }
};

export default appReducer;
