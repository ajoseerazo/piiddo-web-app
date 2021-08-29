import React from "react";
import { AmountStyled, AmountWrapper, CurrencyStyled } from "./styled";

const Amount = ({ currency, value, size = "normal" }) => {
  return (
    <AmountWrapper>
      <AmountStyled size={size}>
        {new Intl.NumberFormat("es").format(value)}
      </AmountStyled>
      <CurrencyStyled size={size}>{currency}</CurrencyStyled>
    </AmountWrapper>
  );
};

export default Amount;
