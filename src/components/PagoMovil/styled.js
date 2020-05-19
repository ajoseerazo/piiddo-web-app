import styled from "styled-components";
import { Button } from "reactstrap";

export const PagoMovilWrapper = styled.div`
  padding: 30px 20px;
  max-width: 768px;
  margin: 0 auto;
  font-size: 14px;

  p {
    text-align: center;
    margin: 0;
  }
`;

export const PagoMovilData = styled.div`
  padding: 15px;
  border-radius: 8px;
  background-color: rgb(247, 247, 247);
  margin-bottom: 15px;
  margin-top: 15px;

  > div {
    > div {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
`;

export const PaymentButton = styled(Button)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100% !important;
  margin: 0px !important;
  border-radius: 0;
  height: 50px;
  background: #f74342;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;

  > div {
    margin-right: 5px;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;

export const DropzoneWrapper = styled.div`
  margin-top: 15px;
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