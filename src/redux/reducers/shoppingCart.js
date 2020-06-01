import actions from "../actions/shoppingCart";

const initialState = {
  stores: {},
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      const {
        order,
        order: { partner },
      } = action;

      const { stores } = state;

      if (!stores[partner.id]) {
        stores[partner.id] = {
          ...partner,
          items: [],
        };
      }

      delete order.partner;

      let items = [...stores[partner.id].items];
      items.push(order);

      stores[partner.id].items = items;

      return {
        ...state,
        stores: Object.assign({}, stores),
      };
    case actions.REMOVE_FROM_CART:
      const { stores: storesToRemove } = state;

      const newItems = [];

      for (let i = 0; i < storesToRemove[action.storeId].items.length; i++) {
        if (i !== action.index) {
          newItems.push(storesToRemove[action.storeId].items[i]);
        }
      }

      storesToRemove[action.storeId].items = newItems;

      if (!storesToRemove[action.storeId].items.length) {
        delete storesToRemove[action.storeId];
      }

      return {
        ...state,
        stores: Object.assign({}, storesToRemove),
      };
    case actions.CHANGE_COUNT:
      const { stores: storesToChange } = state;

      const newOrder = storesToChange[action.storeId].items[action.index];

      const newOrdersUpdated = [];

      if (newOrder) {
        for (let i = 0; i < storesToChange[action.storeId].items.length; i++) {
          if (i !== action.index) {
            newOrdersUpdated.push(storesToChange[action.storeId].items[i]);
          } else {
            newOrder.count = action.count;
            newOrder.totalAmount = newOrder.basePrice * action.count;

            newOrdersUpdated.push(newOrder);
          }
        }

        storesToChange[action.storeId].items = newOrdersUpdated;

        return {
          ...state,
          stores: Object.assign({}, storesToChange),
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
