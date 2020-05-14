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
  removeFromCart: (index) => {
    return {
      type: shoppingCartActions.REMOVE_FROM_CART,
      index
    } 
  },
  changeCount: (index, count) => {
    return {
      type: shoppingCartActions.CHANGE_COUNT,
      index,
      count
    }
  }
}

export default shoppingCartActions;