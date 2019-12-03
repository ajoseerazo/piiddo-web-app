import API from "../../api/index"

const productsActions = {
  GET_ALL_REQUEST: "GET_ALL_REQUEST",
  GET_ALL_SUCCESS: "GET_ALL_SUCCESS",
  GET_ALL_FAIL: "GET_ALL_FAIL",
  fetchingProducts: () => {
    return {
      type: productsActions.GET_ALL_REQUEST
    }
  },
  fetchProductsSuccess: (products) => {
    return {
      type: productsActions.GET_ALL_SUCCESS,
      products
    }
  },
  fetchProductsFailed: (error) => {
    return {
      type: productsActions.GET_ALL_FAIL,
      error
    }
  },
  fetchProducts: () => {
    console.log("ENTRA")
    return async (dispatch) => {
      try {
        dispatch(productsActions.fetchingProducts())

        const products = await API.Products.getAll();

        dispatch(productsActions.fetchProductsSuccess(products))

        return products;
      } catch (error) {
        dispatch(productsActions.fetchProductsFailed(error))
      }
    }
  }
}

export default productsActions;