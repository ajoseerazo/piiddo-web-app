import { Map } from "immutable";
import actions from "../actions/location";
import Cookies from 'cookies-js';

const initialState = new Map({
  deliveryAddress: null,
  deliveryLocation: null,
});

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DELIVERY_PLACE:
      console.log("ENTRA", action.place);

      console.log(Cookies);

      Cookies.set('deliveryAddress', action.place.address);
      Cookies.set('deliveryLocation', JSON.stringify(action.place.location));
      
      return state
        .set("deliveryAddress", action.place.address)
        .set("deliveryLocation", action.place.location);
    default:
      return state;
  }
}
