import React from "react";
import PagoMovil from "../PagoMovil";
import { ModalStyled, ModalBodyStyled } from "./styled";

const PaymentSupportModal = ({
  isOpened,
  type,
  amount,
  orderId,
  onFinishPayment,
  isLoading
}) => {
  return (
    <ModalStyled isOpen={isOpened}>
      <ModalBodyStyled>
        {type === "pago-movil" && (
          <PagoMovil
            amount={amount}
            orderId={orderId}
            onClickPayButton={onFinishPayment}
            loading={isLoading}
          />
        )}
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default PaymentSupportModal;
