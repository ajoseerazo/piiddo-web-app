import React from "react";
import CheckoutPage from "../src/pages/checkout";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";

const Checkout = () => {
  return (
    <>
      <ShopHeader hideShoppingCart />
      
      <CheckoutPage />
    </>
  );
};

export default Checkout;
