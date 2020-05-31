const shoppingCartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CHANGE_COUNT: 'CHANGE_COUNT',
  addToCart: (order) => {
    return {
      type: shoppingCartActions.ADD_TO_CART,
      order
    }
  },
  removeFromCart: (storeId, index) => {
    return {
      type: shoppingCartActions.REMOVE_FROM_CART,
      index,
      storeId
    } 
  },
  changeCount: (storeId, index, count) => {
    return {
      type: shoppingCartActions.CHANGE_COUNT,
      index,
      count,
      storeId
    }
  }
}

export default shoppingCartActions;