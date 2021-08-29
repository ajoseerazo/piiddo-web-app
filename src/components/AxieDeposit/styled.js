import styled from "styled-components";
import { Button } from "reactstrap";

export const PagoMovilWrapper = styled.div`
  padding: 20px 20px;
  max-width: 768px;
  margin: 0 auto;
  font-size: 14px;
  background-color: white;
  background-image: url(https://skymavis.com/static/background.7673d15b.png);
  border-radius: 40px;
  background-position: center;
  background-size: contain;

  p {
    text-align: center;
    margin: 0;
  }
`;

export const PagoMovilData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fd;
  margin-bottom: 15px;
  margin-top: 15px;

  svg {
    cursor: pointer;
    font-size: 20px;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    margin-right: 5px;
    cursor: text;
    outline: none;
  }

  > div {
    > section {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
`;

export const PaymentButton = styled(Button)`
  width: 100%;
  margin: 0px !importat;
  border-radius: 0;
  height: 50px;
  background: #1578ed;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgb(21 120 237 / 10%);

  > div {
    margin-right: 5px;
  }

  &:disabled {
    background-color: #1578ed !important;
    opacity: 0.5;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;

export const DropzoneWrapper = styled.div`
  margin-top: 15px;

  > div {
    background-color: #f8f9fd;

    > section {
      background-color: #f8f9fd;
      border-color: #1578ed !important;
    }
  }
`;

export const BankInfo = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
  }
`;

export const BankInfoName = styled.div`
  font-weight: 600;
  text-transform: uppercase;
`;

export const Wallet = styled.div`
  position: relative;
  background: rgb(22, 122, 236);
  background: linear-gradient(
    151deg,
    rgba(22, 122, 236, 1) 0%,
    rgba(30, 142, 240, 1) 100%
  );
  color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 10px 5px rgb(21 120 237 / 10%);
  margin: 20px 50px;

  img {
    position: absolute;
    bottom: 5px;
    right: 10px;
    width: 100px;
    object-fit: cover;
    object-position: center;
    height: 40px;
  }
`;
