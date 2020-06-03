import React from "react";
import StorePage from "../../../../../src/pages/partner";
import partnersActions from "../../../../../src/redux/actions/partners";
import productsActions from "../../../../../src/redux/actions/products";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { wrapper } from "../../../../../src/redux/store";

const { fetchPartner } = partnersActions;
const { fetchProduct } = productsActions;

const Partner = ({ partner, address, product }) => {
  return (
    <StorePage
      partner={partner}
      address={address}
      modalOpened={true}
      defaultProductSelected={product}
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {
    store,
    params: { slug, id },
  } = ctx;

  const partner = await store.dispatch(fetchPartner(slug));
  const product = await store.dispatch(fetchProduct(id));

  return {
    props: {
      partner,
      product,
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
