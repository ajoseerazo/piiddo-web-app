import { Map } from "immutable";
import actions from "../actions/categories";

const initialState = new Map({
  categories: null,
  isLoading: false,
});

export default function categoriesRegucer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_REQUEST:
      return state.set("isLoading", true);
    case actions.GET_ALL_FAILED:
      return state.set("isLoading", false);
    case actions.GET_ALL_SUCCESS:
      return state.set("categories", action.categories).set("isLoading", true);
    default:
      return state;
  }
}
