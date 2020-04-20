import API from "../../api/index";

const categoriesActions = {
  GET_ALL_REQUEST: "GET_ALL_REQUEST",
  GET_ALL_SUCCESS: "GET_ALL_SUCCESS",
  GET_ALL_FAILED: "GET_ALL_FAILED",
  fetchingCategories: () => {
    return {
      type: categoriesActions.GET_ALL_REQUEST,
    };
  },
  fetchCategoriesFailed: (error) => {
    return {
      type: categoriesActions.GET_ALL_FAILED,
      error,
    };
  },
  fetchCategoriesSuccess: (categories) => {
    return {
      type: categoriesActions.GET_ALL_SUCCESS,
      categories,
    };
  },
  fetchCategories: () => {
    return async (dispatch) => {
      try {
        dispatch(categoriesActions.fetchingCategories());

        const categories = await API.Categories.getAll()

        dispatch(categoriesActions.fetchCategoriesSuccess(categories));

        return categories;
      } catch (error) {
        dispatch(categoriesActions.fetchCategoriesFailed(error));
      }
    };
  },
};

export default categoriesActions;