import React, { useEffect, useState, useCallback } from "react";
import SuccessSVG from "../../success.svg";
import { SuccessWrapper, RedirectionDisclaimer } from "./styled";
import Router from "next/router";

const SuccessScreen = ({ orderId, type, title, redirect = true }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);

      if (redirect) {
        setTimeout(() => {
          Router.push(`/orders/${orderId}/eta`);
        }, 5000);
      }
    }
  }, [mounted]);

  return (
    <SuccessWrapper>
      
    </SuccessWrapper>
  );
};

export default SuccessScreen;
