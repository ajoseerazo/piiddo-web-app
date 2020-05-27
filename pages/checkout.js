import React, { useEffect, useState } from "react";
import CheckoutPage from "../src/pages/checkout";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import { bindActionCreators } from "redux";
import locationActions from "../src/redux/actions/location";
import { connect } from "react-redux";

const { getDeliveryPlace } = locationActions;

const Checkout = ({ actions: { getDeliveryPlace }, place }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      if (!place) {
        getDeliveryPlace();
      }
    }
  }, [mounted, place]);

  return (
    <>
      <ShopHeader hideShoppingCart bordered />

      <CheckoutPage address={(place || {}).address} />
    </>
  );
};

function mapStateToProps(state, props) {
  const { deliveryLocation, deliveryAddress } = state.Location;

  return {
    place: {
      address: deliveryAddress,
      location: deliveryLocation,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getDeliveryPlace }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
