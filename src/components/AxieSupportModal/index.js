import React from "react";
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
}) => {
  return (
    <ModalStyled isOpen={isOpened}>
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
