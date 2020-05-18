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
      padding: 20px 0px;
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
  min-width: 660px;
  margin-right: 40px;

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  padding: 20px 0px;
  border-top: 1px solid #e5edef;
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
    font-size: 20px;
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
