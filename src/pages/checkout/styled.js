import styled from "styled-components";
import { Button } from "reactstrap";

export const Wrapper = styled.div`
  background: #fafaf8;

  > div {
    max-width: 1120px;
    margin: 70px auto 0px;
    padding: 20px 20px;
    min-height: calc(100vh - 70px);
  }

  @media screen and (max-width: 768px) {
    > div {
      margin-top: 50px;
      padding: 20px 0px 70px;
    }
  }
`;

export const CheckoutTitle = styled.div`
  font-size: 24px;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    padding: 0px 15px;
  }
`;

export const CheckoutContent = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CheckoutContentLeft = styled.div`
  margin-right: 40px;
  flex: 1;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
    margin-right: 0px;
  }
`;

export const CheckoutBox = styled.div`
  padding: 20px;
  margin: 15px 0px;
  background: white;
  border-radius: 16px;
  min-width: 350px;
`;

export const CheckoutContentRight = styled.div`
  flex: 1;

  ${CheckoutBox} {
    box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
    position: sticky;
    top: 90px;
  }
`;

export const CheckoutAddress = styled.div``;

export const CheckoutPaymentMethod = styled.div``;

export const CheckoutCoupon = styled.div`
  display: none;
`;

export const CheckoutProductsSummary = styled.div``;

export const CheckoutSummaryItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
`;

export const CheckoutSummaryItemTitle = styled.div`
  color: #9faab7;
`;

export const CheckoutSummaryItemPrice = styled.div``;

export const CheckoutTotal = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 20px 0px;
  border-top: 1px solid #e5edef;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
  }
`;

export const CheckoutTotalTitle = styled.div``;
export const CheckoutTotalPrice = styled.div``;

export const CheckoutButton = styled(Button)`
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
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
`;

export const CheckoutBoxTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const CheckoutAddressText = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 5px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CheckoutTimeContainer = styled.div`
  border-top: 1px solid #e5edef;
  padding: 20px 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  font-weight: 600;
`;

export const PaymentMethodSelected = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
`;

export const PaymentMethodSelectedTitle = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const PaymentMethodChangeButton = styled(Button)`
  background: #f74342;
  border: none;
  border-radius: 8px;
  height: 30px;

  padding: 0px 20px;
  font-size: 14px;

  &:hover,
  &:active,
  &:visited  {
    background: #f74342;
    border: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CashAmount = styled.div`
  padding-top: 10px;

  > div {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CheckoutInput = styled.input`
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
`;

export const CheckoutPersonalDataGroup = styled.div`
  margin-top: 15px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: 15px;
  font-size: 12px;
`;

export const PaypalButtonWrapper = styled.div`
  position: relative;
`;

export const PayPalButtonDisabling = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1000;
`;

export const CouponForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input {
    margin-left: 20px;
    margin-right: 20px;
    flex: 1;
  }

  button {
    width: 100px;
    height: 35px;
  }
`;

export const Coupon = styled.div`
  font-weight: 700;
`;
