import { Map } from "immutable";
import actions from "../actions/categories";

const initialState = {
  categories: null,
  isLoading: false,
  isLoadingCategory: false,
  category: null,
};

export default function categoriesRegucer(state = initialState, action) {
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
        categories: action.categories,
        isLoading: false,
      };
    case actions.GET_CATEGORY_REQUEST:
      return {
        ...state,
        category: null,
        isLoadingCategory: true,
      };
    case actions.GET_CATEGORY_FAILED:
      return {
        ...state,
        isLoadingCategory: false,
      };
    case actions.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.category,
        isLoadingCategory: false,
      };
    default:
      return state;
  }
}
