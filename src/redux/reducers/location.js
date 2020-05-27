import { Map } from "immutable";
import actions from "../actions/location";
import API from "../../api";

const initialState = {
  deliveryAddress: null,
  deliveryLocation: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DELIVERY_PLACE:
      API.DeliveryLocation.set(action.place.address, action.place.location);

      return {
        ...state,
        deliveryAddress: action.place.address,
        deliveryLocation: action.place.location,
      };
    case actions.GET_DELIVERY_PLACE:
      const { address, location } = API.DeliveryLocation.get();

      return {
        ...state,
        deliveryAddress: address,
        deliveryLocation: location,
      };
    default:
      return state;
  }
}
