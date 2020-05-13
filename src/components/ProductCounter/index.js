import React, { useState, useCallback } from "react";
import { ProductCounterWrapper, ButtonStyled } from "./styled";

const ProductCounter = ({ onChangeCount }) => {
  const [count, setCount] = useState(1);

  const decrease = useCallback(() => {
    let newCount = count - 1;

    if (newCount < 1) {
      newCount = 1;
    }

    setCount(newCount);
    onChangeCount(newCount);
  }, [count]);

  const increase = useCallback(() => {
    let newCount = count + 1;

    setCount(newCount);
    onChangeCount(newCount);
  }, [count]);

  return (
    <ProductCounterWrapper>
      <ButtonStyled onClick={decrease}>-</ButtonStyled>
      <div>{count}</div>
      <ButtonStyled onClick={increase}>+</ButtonStyled>
    </ProductCounterWrapper>
  );
};

export default ProductCounter;
