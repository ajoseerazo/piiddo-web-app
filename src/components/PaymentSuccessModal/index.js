import React from "react";
import { ModalStyled, ModalBodyStyled } from "./styled";
import PaymentSuccessScreen from "../PaymentSuccessScreen";

const PaymentSuccessModal = ({ isOpened, orderId }) => {
  return (
    <ModalStyled isOpen={isOpened}>
      <ModalBodyStyled>
        <PaymentSuccessScreen orderId={orderId} type="inner-payment" />
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default PaymentSuccessModal;
