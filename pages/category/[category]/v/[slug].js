import React from "react";
import StorePage from "../../../../src/pages/partner";
import partnersActions from "../../../../src/redux/actions/partners";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { wrapper } from "../../../../src/redux/store";

const { fetchPartner } = partnersActions;

const Partner = ({ partner, address }) => {
  return (
    <StorePage
      partner={partner}
      address={address}
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {
    store,
    params: { slug },
  } = ctx;

  const partner = await store.dispatch(fetchPartner(slug));

  return {
    props: {
      partner,
    },
  };
});

function mapStateToProps(state, props) {
  const { categories } = state.Categories;
  const { partners, isLoading } = state.Partners;
  const { deliveryLocation } = state.Location;

  return {
    categories,
    partners,
    isLoadingPartners: isLoading,
    deliveryLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchPartner,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
