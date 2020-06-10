import API from "../../api/index";

const productsActions = {
  GET_ALL_PRODUCTS_REQUEST: "GET_ALL_PRODUCTS_REQUEST",
  GET_ALL_PRODUCTS_SUCCESS: "GET_ALL_PRODUCTS_SUCCESS",
  GET_ALL_PRODUCTS_FAIL: "GET_ALL_PRODUCTS_FAIL",
  SELECT_PRODUCT: "SELECT_PRODUCT",
  GET_PRODUCT_REQUEST: "GET_PRODUCT_REQUEST",
  GET_PRODUCT_SUCCESS: "GET_PRODUCT_SUCCESS",
  GET_PRODUCT_FAIL: "GET_PRODUCT_FAIL",
  SEARCH_PRODUCTS_REQUEST: "SEARCH_PRODUCTS_REQUEST",
  SEARCH_PRODUCTS_SUCCESS: "SEARCH_PRODUCTS_SUCCESS",
  SEARCH_PRODUCTS_FAILED: "SEARCH_PRODUCTS_FAILED",
  fetchingProducts: () => {
    return {
      type: productsActions.GET_ALL_PRODUCTS_REQUEST,
    };
  },
  fetchProductsSuccess: (products, extras, companions) => {
    return {
      type: productsActions.GET_ALL_PRODUCTS_SUCCESS,
      products,
      extras,
      companions,
    };
  },
  fetchProductsFailed: (error) => {
    return {
      type: productsActions.GET_ALL_PRODUCTS_FAIL,
      error,
    };
  },
  fetchProducts: (parentId, type = "partner") => {
    return async (dispatch) => {
      try {
        dispatch(productsActions.fetchingProducts());

        const products = await API.Products.getAll(parentId, type);

        const finalProducts = [];
        const extras = [];
        const companions = [];

        for (let i = 0; i < products.length; i++) {
          if (products[i].isExtra) {
            extras.push(products[i]);
          } else {
            if (products[i].isCompanion) {
              companions.push(products[i]);
            } else {
              finalProducts.push(products[i]);
            }
          }
        }

        dispatch(
          productsActions.fetchProductsSuccess(
            finalProducts,
            extras,
            companions
          )
        );

        return [finalProducts, extras, companions];
      } catch (error) {
        dispatch(productsActions.fetchProductsFailed(error));
      }
    };
  },
  selectProduct: (product) => {
    return {
      type: productsActions.SELECT_PRODUCT,
      product,
    };
  },
  fetchingProduct: () => {
    return {
      type: productsActions.GET_PRODUCT_REQUEST,
    };
  },
  fetchProductFailed: (error) => {
    return {
      type: productsActions.GET_PRODUCT_FAIL,
      error,
    };
  },
  fetchProductSuccess: (product) => {
    return {
      type: productsActions.GET_PRODUCT_SUCCESS,
      product,
    };
  },
  fetchProduct: (id) => {
    return async (dispatch) => {
      try {
        dispatch(productsActions.fetchingProduct());

        const product = await API.Products.get(id);

        dispatch(productsActions.fetchProductSuccess(product));

        return product;
      } catch (error) {
        dispatch(productsActions.fetchProductFailed(error));
      }
    };
  },
  searchingProducts: () => {
    return {
      type: productsActions.SEARCH_PRODUCTS_REQUEST,
    };
  },
  searchProductsSuccess: (products) => {
    return {
      type: productsActions.SEARCH_PRODUCTS_SUCCESS,
      products,
    };
  },
  searchProductsFailed: (error) => {
    return {
      type: productsActions.SEARCH_PRODUCTS_FAILED,
      error,
    };
  },
  searchProducts: (searchText) => {
    return async (dispatch) => {
      try {
        dispatch(productsActions.searchingProducts());

        const products = await API.Products.search(searchText);

        dispatch(productsActions.searchProductsSuccess(products));
      } catch (error) {
        dispatch(productsActions.searchProductsFailed(error));
      }
    };

    return products;
  },
};

export default productsActions;

