import React from "react";
import { AmountStyled, AmountWrapper, CurrencyStyled } from "./styled";

const Amount = ({ currency, value }) => {
  return (
    <AmountWrapper>
      <CurrencyStyled>{currency}</CurrencyStyled>
      <AmountStyled>{new Intl.NumberFormat("es").format(value)}</AmountStyled>
    </AmountWrapper>
  );
};

export default Amount;
