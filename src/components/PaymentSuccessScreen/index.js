import React, { useEffect, useState, useCallback } from "react";
import SuccessSVG from "../../success.svg";
import { SuccessWrapper, RedirectionDisclaimer } from "./styled";
import Router from 'next/router'

const SuccessScreen = ({ orderId }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);

      setTimeout(() => {
        Router.push(`/order/${orderId}/eta`)
      }, 5000);
    }
  }, [mounted]);

  return (
    <div>
      <SuccessWrapper>
        <div>Comprobante de pago recibido exitosamente</div>
        <SuccessSVG />
        <div>Estamos confirmando el pago y en breve será notificado</div>

        <RedirectionDisclaimer>
          En segundos será redirigido
        </RedirectionDisclaimer>
      </SuccessWrapper>
    </div>
  );
};

export default SuccessScreen;
