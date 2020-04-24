import { Map } from "immutable";
import actions from "../actions/partners";

const initialState = new Map({
  partners: null,
  isLoading: false,
  isLoadingPartner: false,
  partner: null,
});

export default function partnersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_REQUEST:
      return state.set("isLoading", true);
    case actions.GET_ALL_FAILED:
      return state.set("isLoading", false);
    case actions.GET_ALL_SUCCESS:
      return state.set("partners", action.partners).set("isLoading", false);
    case actions.GET_PARTNER_REQUEST:
      return state.set("isLoadingPartner", true);
    case actions.GET_PARTNER_FAILED:
      return state.set("isLoadingPartner", false);
    case actions.GET_PARTNER_SUCCESS:
      return state
        .set("partner", action.partner)
        .set("isLoadingPartner", false);
    default:
      return state;
  }
}
