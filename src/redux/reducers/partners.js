import actions from "../actions/partners";

const initialState = {
  partners: null,
  isLoading: false,
  isLoadingPartner: false,
  partner: null,
  catalog: null,
  isLoadingCatalog: false,
  isLoadingCatalogCategories: false,
  catalogCategories: null,
  catalogLoaded: false,
  partnersResult: null,
  isSearchingPartners: false,
};

export default function partnersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_PARTNERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_ALL_PARTNERS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_ALL_PARTNERS_SUCCESS:
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
    case actions.GET_CATALOG_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoadingCatalogCategories: true,
        catalogLoaded: false,
      };
    case actions.GET_CATALOG_CATEGORIES_FAILED:
      return {
        ...state,
        isLoadingCatalogCategories: false,
        catalogLoaded: true,
      };
    case actions.GET_CATALOG_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCatalogCategories: false,
        catalogCategories: action.categories,
        catalogLoaded: true,
      };
    case actions.SEARCH_PARTNERS_REQUEST:
      return {
        ...state,
        isSearchingPartners: true,
      };
    case actions.SEARCH_PARTNERS_FAILED:
      return {
        ...state,
        isSearchingPartners: false,
      };
    case actions.SEARCH_PARTNERS_SUCCESS:
      const storesHash = {};

      for (let i = 0; i < action.partners.length; i++) {
        if (!storesHash[action.partners[i].slug]) {
          const partner = action.partners[i];

          storesHash[partner.slug] = {
            ...partner,
          };
          storesHash[partner.slug].products = [];
        }
      }

      return {
        ...state,
        isSearchingPartners: false,
        partnersResult: storesHash,
      };
    default:
      return state;
  }
}
