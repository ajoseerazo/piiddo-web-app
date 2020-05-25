import actions from "../actions/shoppingCart";

const initialState = {
  items: [],
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      const oldItems = state.items;

      return {
        ...state,
        items: oldItems.concat([action.order]),
      };
    case actions.REMOVE_FROM_CART:
      const newItems = [];

      for (let i = 0; i < state.items.length; i++) {
        if (i !== action.index) {
          newItems.push(state.items[i]);
        }
      }

      return {
        ...state,
        items: newItems,
      };
    case actions.CHANGE_COUNT:
      const newOrder = state.items[action.index];

      const newOrdersUpdated = [];

      if (newOrder) {
        for (let i = 0; i < state.items.length; i++) {
          if (i !== action.index) {
            newOrdersUpdated.push(state.items[i]);
          } else {
            newOrder.count = action.count;
            newOrder.totalAmount = newOrder.basePrice * action.count;

            newOrdersUpdated.push(newOrder);
          }
        }

        return {
          ...state,
          items: newOrdersUpdated,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
