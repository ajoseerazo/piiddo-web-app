const shoppingCartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  addToCart: (order) => {
    return {
      type: shoppingCartActions.ADD_TO_CART,
      order
    }
  }
}

export default shoppingCartActions;