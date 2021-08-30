import React, { useEffect } from "react";
import AxieDeposit from "../AxieDeposit";
import { ModalStyled, ModalBodyStyled } from "./styled";
import PaymentSuccessScreen from "../PaymentSuccessScreen";

const AxieSupportModal = ({
  isOpened,
  type,
  amount,
  orderId,
  onFinishPayment,
  isLoading,
  paymentSupportSent,
  onRequestClose
}) => {
  useEffect(() => {
    if (isOpened) {
      document.body.style = "overflow: hidden";
    } else {
      document.body.style = "";
    }
  }, [isOpened]);
  return (
    <ModalStyled isOpen={isOpened} onClose={onRequestClose}>
      <ModalBodyStyled>
        {!paymentSupportSent ? (
          <AxieDeposit
            amount={amount}
            orderId={orderId}
            onClickPayButton={onFinishPayment}
            loading={isLoading}
            type={type}
          />
        ) : (
          <PaymentSuccessScreen orderId={orderId} />
        )}
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default AxieSupportModal;
