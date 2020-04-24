import API from "../../api/index";

const partnersActions = {
  GET_ALL_REQUEST: "GET_ALL_REQUEST",
  GET_ALL_SUCCESS: "GET_ALL_SUCCESS",
  GET_ALL_FAILED: "GET_ALL_FAILED",
  GET_PARTNER_REQUEST: "GET_PARTNER_REQUEST",
  GET_PARTNER_SUCCESS: "GET_PARTNER_SUCCESS",
  GET_PARTNER_FAILED: "GET_PARTNER_SUCCESS",
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
};

export default partnersActions;
