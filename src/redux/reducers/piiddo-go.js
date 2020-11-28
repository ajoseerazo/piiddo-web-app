import actions from "../actions/piiddo-go";

const initialState = {
  rideRequest: null,
};

export default function piiddoGoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_RIDE_REQUEST:
      return {
        ...state,
        rideRequest: action.rideRequest,
      };
    default:
      return state;
  }
}
