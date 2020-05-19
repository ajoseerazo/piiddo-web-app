import React from "react";
import PagoMovil from "../PagoMovil";
import { ModalStyled, ModalBodyStyled } from "./styled";
import PaymentSuccessScreen from "../PaymentSuccessScreen";

const PaymentSupportModal = ({
  isOpened,
  type,
  amount,
  orderId,
  onFinishPayment,
  isLoading,
  paymentSupportSent,
}) => {
  console.log(orderId);
  return (
    <ModalStyled isOpen={isOpened}>
      <ModalBodyStyled>
        {!paymentSupportSent ? (
          <PagoMovil
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

export default PaymentSupportModal;
