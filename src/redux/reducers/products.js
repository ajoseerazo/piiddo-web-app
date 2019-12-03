import { Map } from 'immutable'
import actions from '../actions/products'

const initialState = new Map({
  products: null, 
  isLoading: false
});

export default function productsReducer (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_REQUEST:
      return state.set('isLoading', true);
    case actions.GET_ALL_FAIL:
      return state.set('isLoading', false);
    case actions.GET_ALL_SUCCESS:
      return state.set('products', action.products).set('isLoading', true);
    default:
      return state;
  }
}