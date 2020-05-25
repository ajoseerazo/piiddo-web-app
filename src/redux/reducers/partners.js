import actions from "../actions/partners";

const initialState = {
  partners: null,
  isLoading: false,
  isLoadingPartner: false,
  partner: null,
  catalog: null,
  isLoadingCatalog: false,
};

export default function partnersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_ALL_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        partners: action.partners,
      };
    case actions.GET_PARTNER_REQUEST:
      return {
        ...state,
        isLoadingPartner: false,
      };
    case actions.GET_PARTNER_FAILED:
      return {
        ...state,
        isLoadingPartner: false,
      };
    case actions.GET_PARTNER_SUCCESS:
      return {
        ...state,
        partner: action.partner,
        isLoadingPartner: false,
      };
    case actions.GET_CATALOG_REQUEST:
      return {
        ...state,
        isLoadingCatalog: true,
      };
    case actions.GET_CATALOG_FAILED:
      return {
        ...state,
        isLoadingCatalog: false,
      };
    case actions.GET_CATALOG_SUCCESS:
      return {
        ...state,
        isLoadingCatalog: false,
        catalog: action.catalog,
      };
    default:
      return state;
  }
}
