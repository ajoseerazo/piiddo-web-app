import styled from "styled-components";
import { Button } from "reactstrap";

export const ShoppingCartWrapper = styled.div`
  font-family: "Poppins";
  background-color: #fff !important;
  position: fixed !important;
  bottom: 0;
  top: 0;
  text-align: left;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 100%;
  width: 100%;
  background-color: white;
  justify-content: stretch;
  z-index: 1000;
  transition: all 0.4s ease;
  right: -100%;
  max-width: 500px;
  border-radius: 0px !important;
  border: none !important;

  &.show {
    right: 0;
  }
`;

export const ShoppingCartHeader = styled.div`
  border-bottom: 1px solid #ddd !important;
  padding: 1.5em !important;
  background-color: white !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #333;
    font-weight: 600;
    font-size: 18px;
  }

  .btn {
    background-color: white;
    font-size: 14px;
    border: none;
    color: #f74342;
    padding-right: 0px;

    &:hover,
    &:active,
    &:visited {
      background-color: white !important;
      color: #f74342 !important;
      box-shadow: none !important;
    }

    span {
      margin-right: 8px;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 15px !important;
  }
`;

export const Overlay = styled.div`
  cursor: pointer;
  transition: all 0.4s ease;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  background: rgba(51, 41, 39, 0.5);

  &.overflow {
    visibility: visible;
    opacity: 1;
  }
`;

export const CartContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-grow: 1;

  h3 {
    color: #443 !important;
    font-weight: bolder;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      margin-top: 30px;
    }
  }
`;

export const EmptyCartContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartSummary = styled.div`
  border-top: 1px solid #ddd;
  background-color: #f7f7f6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  line-height: 1;

  @media screen and (max-width: 768px) {
    padding: 15px !important;
  }
`;

export const DeliverySummary = styled.div`
  padding-bottom: 0.85em;
  color: #888;
  font-weight: 600;
  font-size: 12px;
`;

export const Amount = styled.span`
  float: right;
`;

export const TotalSummary = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #222 !important;
`;

export const CheckoutButtonStyled = styled(Button)`
  background-color: #f74342 !important;
  border: none !important;
  margin-top: 10px;

  &:hover,
  &:active,
  &:focus {
    background-color: #f74342 !important;
    box-shadow: none !important;
    border: none !important;
  }
`;
/*.containerShoppingArticles > div {
    width: 100%;
  }
  .containerShoppingArticles > div > div {
    width: 100%;
  }
  */
