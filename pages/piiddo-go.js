import React from "react";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import GoogleMaps from "../src/components/GoogleMaps";
import styled from "styled-components";
import { Button } from "reactstrap";

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
        <Styld.FormWrapper>
          <Styld.FormControl>
            <Styld.Input placeholder="Desde" />
          </Styld.FormControl>

          <Styld.FormControl>
            <Styld.Input placeholder="Hasta" />
          </Styld.FormControl>

          <Styld.Button disabled={true}>Solicitar</Styld.Button>
        </Styld.FormWrapper>

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
  `,
  FormWrapper: styled.div`
    width: 380px;
    min-height: 200px;
    background-color: white;
    position: absolute;
    top: 85px;
    left: 10px;
    z-index: 1;
    box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
    border-radius: 20px;
    padding: 16px;
  `,
  Input: styled.input`
    width: 100%;
    height: 50px;
    background: #f7f7f7;
    border: none;
    border-radius: 8px;
    padding: 12px;

    &:focus {
      box-shadow: none;
      outline: none;
    }
  `,
  FormControl: styled.div`
    margin-bottom: 10px;
  `,
  Button: styled(Button)`
    width: 100%;
    background: #f74342;
    border: none;
    border-radius: 8px;
    height: 50px;
    font-size: 14px;

    &:disabled {
      border: none;
      background-color: #f74342;
      color: white;
      opacity: 0.7;

      &:hover {
        cursor: initial;
        box-shadow: none;
      }
    }

    &:hover,
    &:active,
    &:visited  {
      background: #f74342;
      border: none;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
  `,
};

export default PiiddoGo;
