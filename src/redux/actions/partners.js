import API from "../../api/index";

const partnersActions = {
  GET_ALL_REQUEST: "GET_ALL_REQUEST",
  GET_ALL_SUCCESS: "GET_ALL_SUCCESS",
  GET_ALL_FAILED: "GET_ALL_FAILED",
  fetchingPartners: () => {
    return {
      type: partnersActions.GET_ALL_REQUEST,
    };
  },
  fetchPartnersFailed: (error) => {
    return {
      type: partnersActions.GET_ALL_FAILED,
      error,
    };
  },
  fetchPartnersSuccess: (partners) => {
    return {
      type: partnersActions.GET_ALL_SUCCESS,
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
};

export default partnersActions;
