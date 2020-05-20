import React, { useEffect, useState, useCallback } from "react";
import SuccessSVG from "../../success.svg";
import { SuccessWrapper, RedirectionDisclaimer } from "./styled";
import Router from "next/router";

const SuccessScreen = ({ orderId, type }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);

      setTimeout(() => {
        Router.push(`/order/${orderId}/eta`);
      }, 5000);
    }
  }, [mounted]);

  return (
    <SuccessWrapper>
      {type !== "inner-payment" ? (
        <div>Comprobante de pago recibido exitosamente</div>
      ) : (
        <div>Orden procesada exitosamente</div>
      )}
      <SuccessSVG />
      <div>
        {type !== "inner-payment"
          ? "Estamos confirmando el pago y en breve será notificado"
          : "Tu pedido está siendo confirmado con la tienda"}
      </div>

      <RedirectionDisclaimer>En segundos será redirigido</RedirectionDisclaimer>
    </SuccessWrapper>
  );
};

export default SuccessScreen;
