import API from "../../api/index";

const partnersActions = {
  GET_ALL_PARTNERS_REQUEST: "GET_ALL_PARTNERS_REQUEST",
  GET_ALL_PARTNERS_SUCCESS: "GET_ALL_PARTNERS_SUCCESS",
  GET_ALL_PARTNERS_FAILED: "GET_ALL_PARTNERS_FAILED",
  GET_PARTNER_REQUEST: "GET_PARTNER_REQUEST",
  GET_PARTNER_SUCCESS: "GET_PARTNER_SUCCESS",
  GET_PARTNER_FAILED: "GET_PARTNER_SUCCESS",
  GET_CATALOG_REQUEST: "GET_CATALOG_REQUEST",
  GET_CATALOG_SUCCESS: "GET_CATALOG_REQUEST",
  GET_CATALOG_FAILED: "GET_CATALOG_FAILED",
  GET_CATALOG_CATEGORIES_REQUEST: "GET_CATALOG_CATEGORIES_REQUEST",
  GET_CATALOG_CATEGORIES_SUCCESS: "GET_CATALOG_CATEGORIES_SUCCESS",
  GET_CATALOG_CATEGORIES_FAILED: "GET_CATALOG_CATEGORIES_FAILED",
  fetchingPartners: () => {
    return {
      type: partnersActions.GET_ALL_PARTNERS_REQUEST,
    };
  },
  fetchPartnersFailed: (error) => {
    return {
      type: partnersActions.GET_ALL_PARTNERS_FAILED,
      error,
    };
  },
  fetchPartnersSuccess: (partners) => {
    return {
      type: partnersActions.GET_ALL_PARTNERS_SUCCESS,
      partners,
    };
  },
  fetchPartners: (categorySlug, subcategorySlug) => {
    return async (dispatch) => {
      try {
        dispatch(partnersActions.fetchingPartners());

        const partners = await API.Partners.getAll(
          categorySlug,
          subcategorySlug
        );

        dispatch(partnersActions.fetchPartnersSuccess(partners));

        return partners;
      } catch (error) {
        dispatch(partnersActions.fetchPartnersFailed(error));
      }
    };
  },
  fetchingPartner: () => {
    return {
      type: partnersActions.GET_PARTNER_REQUEST,
    };
  },
  fetchPartnerSuccess: (partner) => {
    return {
      type: partnersActions.GET_PARTNER_FAILED,
      partner,
    };
  },
  fetchPartnerFailed: (error) => {
    return {
      type: partnersActions.GET_PARTNER_FAILED,
      error,
    };
  },
  fetchPartner: (slug) => {
    return async (dispatch) => {
      try {
        dispatch(partnersActions.fetchingPartner());

        const partner = await API.Partners.getBySlug(slug);

        dispatch(partnersActions.fetchPartnerSuccess(partner));

        return partner;
      } catch (error) {
        dispatch(partnersActions.fetchPartnerFailed(error));
      }
    };
  },
  fetchingCatalog: () => {
    return {
      type: partnersActions.GET_CATALOG_REQUEST,
    };
  },
  fetchCatalogFailed: (error) => {
    return {
      type: partnersActions.GET_CATALOG_FAILED,
      error,
    };
  },
  fetchCatalogSuccess: (catalog) => {
    return {
      type: partnersActions.GET_CATALOG_SUCCESS,
      catalog,
    };
  },
  fetchCatalog: (partnerId) => {
    return async (dispatch) => {
      try {
        dispatch(partnersActions.fetchingCatalog());

        const catalog = await API.Partners.getCatalog(partnerId);

        dispatch(partnersActions.fetchCatalogSuccess(catalog));

        return catalog;
      } catch (error) {
        dispatch(partnersActions.fetchCatalogFailed(error));
      }
    };
  },
  fetchingCatalogCategories: () => {
    return {
      type: partnersActions.GET_CATALOG_CATEGORIES_REQUEST
    }
  },
  fetchCatalogCaegoriesFailed: (error) => {
    return {
      type: partnersActions.GET_CATALOG_CATEGORIES_FAILED,
      error
    }
  },
  fetchCatalogCategoriesSuccess: (categories) => {
    return {
      type: partnersActions.GET_CATALOG_CATEGORIES_SUCCESS,
      categories
    }
  },
  fetchCatalogCategories: (catalogId) => {
    return async (dispatch) => {
      try {
        dispatch(partnersActions.fetchingCatalogCategories());

        const categories = await API.Partners.getCatalogCategories(catalogId);

        dispatch(partnersActions.fetchCatalogCategoriesSuccess(categories));

        return categories;
      } catch (error) {
        dispatch(partnersActions.fetchCatalogFailed(error));
      }
    };
  } 
};

export default partnersActions;
