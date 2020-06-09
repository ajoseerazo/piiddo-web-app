import { Map } from "immutable";
import actions from "../actions/products";

const initialState = {
  products: null,
  extras: null,
  companions: null,
  isLoading: false,
  product: null,
  isLoadingProduct: false,
  isSearching: false,
  productsResult: null,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_ALL_PRODUCTS_SUCCESS:
      if (action.products) {
        return {
          ...state,
          isLoading: false,
          products: action.products || null,
          extras: action.extras || null,
          companions: action.companions || null,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }
    case actions.SELECT_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actions.GET_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingProduct: true,
      };
    case actions.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoadingProduct: false,
        product: action.product,
      };
    case actions.GET_PRODUCT_FAIL:
      console.log(action.error);
      return {
        ...state,
        isLoadingProduct: false,
      };
    case actions.SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isSearching: true,
        productsResult: null,
      };
    case actions.SEARCH_PRODUCTS_FAILED:
      console.log(action.error);
      return {
        ...state,
        isSearching: false,
      };
    case actions.SEARCH_PRODUCTS_SUCCESS:
      const productsHash = {};

      for (let i = 0; i < action.products.length; i++) {
        if (!productsHash[action.products[i].partner.slug]) {
          const partner = action.products[i].partner;
          partner.mainCategory = action.products[i].partnerMainCategory;

          productsHash[action.products[i].partner.slug] = {
            ...action.products[i].partner,
          };
          productsHash[action.products[i].partner.slug].products = [];
        }

        productsHash[action.products[i].partner.slug].products.push(
          action.products[i]
        );
      }

      return {
        ...state,
        isSearching: false,
        productsResult: productsHash,
      };
    default:
      return state;
  }
}
