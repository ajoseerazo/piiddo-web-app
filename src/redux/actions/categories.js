import API from "../../api/index";

const categoriesActions = {
  GET_ALL_REQUEST: "GET_ALL_REQUEST",
  GET_ALL_SUCCESS: "GET_ALL_SUCCESS",
  GET_ALL_FAILED: "GET_ALL_FAILED",
  GET_CATEGORY_REQUEST: "GET_CATEGORY_REQUEST",
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_FAILED: "GET_CATEGORY_FAILED",
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
        console.log(error);

        dispatch(categoriesActions.fetchCategoriesFailed(error));
      }
    };
  },
  fetchingCategory: () => {
    return {
      type: categoriesActions.GET_CATEGORY_REQUEST
    }
  },
  fecthCategoryFailed: (error) => {
    return {
      type: categoriesActions.GET_CATEGORY_FAILED,
      error
    }
  },
  fetchCategorySuccess: (category) => {
    return {
      type: categoriesActions.GET_CATEGORY_SUCCESS,
      category
    }
  },
  fetchCategory: (categorySlug) => {
    return async (dispatch) => {
      try {
        dispatch(categoriesActions.fetchingCategory());

        const category = await API.Categories.getCategoryBySlug(categorySlug);

        dispatch(categoriesActions.fetchCategorySuccess(category));

        return category;
      } catch (error) {
        dispatch(categoriesActions.fecthCategoryFailed(error));
      }
    };
  }
};

export default categoriesActions;