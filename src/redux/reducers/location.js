import { Map } from "immutable";
import actions from "../actions/location";
import Cookies from "cookies-js";

const initialState = {
  deliveryAddress: null,
  deliveryLocation: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DELIVERY_PLACE:
      Cookies.set("deliveryAddress", action.place.address);
      Cookies.set("deliveryLocation", JSON.stringify(action.place.location));

      return {
        ...state,
        deliveryAddress: action.place.address,
        deliveryLocation: action.place.location,
      };
    default:
      return state;
  }
}
