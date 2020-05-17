import React from "react";
import CheckoutPage from "../src/pages/checkout";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import cookies from "next-cookies";

const Checkout = ({ address }) => {
  return (
    <>
      <ShopHeader hideShoppingCart bordered />

      <CheckoutPage address={address} />
    </>
  );
};

Checkout.getInitialProps = (ctx) => {
  const address = cookies(ctx).deliveryAddress;

  console.log("Address", address);

  return { address };
};

export default Checkout;
