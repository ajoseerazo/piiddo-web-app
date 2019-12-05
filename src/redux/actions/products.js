import API from "../../api/index"

const productsActions = {
  GET_ALL_REQUEST: "GET_ALL_REQUEST",
  GET_ALL_SUCCESS: "GET_ALL_SUCCESS",
  GET_ALL_FAIL: "GET_ALL_FAIL",
  SELECT_PRODUCT: "SELECT_PRODUCT",
  GET_PRODUCT_REQUEST: "GET_PRODUCT_REQUEST",
  GET_PRODUCT_SUCCESS: "GET_PRODUCT_SUCCESS",
  GET_PRODUCT_FAIL: "GET_PRODUCT_FAIL",
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
  fetchProducts: (category, isOcassion) => {
    return async (dispatch) => {
      try {
        dispatch(productsActions.fetchingProducts())

        const products = await API.Products.getAll(category, isOcassion);

        dispatch(productsActions.fetchProductsSuccess(products))

        return products;
      } catch (error) {
        dispatch(productsActions.fetchProductsFailed(error))
      }
    }
  },
  selectProduct: (product) => {
    return {
      type: productsActions.SELECT_PRODUCT,
      product
    }
  },
  fetchingProduct: () => {
    return {
      type: productsActions.GET_PRODUCT_REQUEST
    }
  },
  fetchProductFailed: (error) => {
    return {
      type: productsActions.GET_PRODUCT_FAIL,
      error
    }
  },
  fetchProductSuccess: (product) => {
    return {
      type: productsActions.GET_PRODUCT_SUCCESS,
      product
    }
  },
  fetchProduct: (id) => {
    return async (dispatch) => {
      try {
        dispatch(productsActions.fetchingProduct())

        const product = await API.Products.get(id)

        dispatch(productsActions.fetchProductSuccess(product))

        return product
      } catch (error) {
        dispatch(productsActions.fetchProductFailed(error))
      }
    }
  }
}

export default productsActions;