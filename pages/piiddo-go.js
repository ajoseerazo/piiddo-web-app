import React from "react";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import GoogleMaps from "../src/components/GoogleMaps";
import styled from "styled-components";

const PiiddoGo = () => {
  return (
    <>
      <ShopHeader
        hideAddressSelector
        hideBackButton
        hideSarchBar
        hideShoppingCart
      />

      <Styld.PageWrapper>
        <GoogleMaps
          containerElement={<Styld.MapWrapperStyled />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Styld.PageWrapper>
    </>
  );
};

const Styld = {
  MapWrapperStyled: styled.div`
    height: calc(100vh - 70px);

    @media screen and (max-width: 768px) {
      height: calc(100vh - 50px);
    }
  `,
  PageWrapper: styled.div`
    margin-top: 70px;

    @media screen and (max-width: 768px) {
      margin-top: 50px;
    }
  `
};

export default PiiddoGo;
