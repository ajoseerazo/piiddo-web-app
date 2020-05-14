import React, { useState, useCallback } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ProductCounterWrapper, ButtonStyled, AmountWrapper } from "./styled";

library.add([faTrashAlt]);

const ProductCounterTiny = ({ amount, onChangeCount, onClickDelete }) => {
  const [count, setCount] = useState(amount);

  const decrease = useCallback(() => {
    let newCount = count - 1;

    if (newCount < 1) {
      onClickDelete();
    } else {
      setCount(newCount);

      if (onChangeCount) {
        onChangeCount(newCount);
      }
    }
  }, [count]);

  const increase = useCallback(() => {
    let newCount = count + 1;

    setCount(newCount);

    if (onChangeCount) {
      onChangeCount(newCount);
    }
  }, [count]);

  return (
    <ProductCounterWrapper>
      <ButtonStyled onClick={decrease}>
        {count === 1 ? <FontAwesomeIcon icon="trash-alt" /> : <span>-</span>}
      </ButtonStyled>
      <AmountWrapper>{count}</AmountWrapper>
      <ButtonStyled onClick={increase}>+</ButtonStyled>
    </ProductCounterWrapper>
  );
};

export default ProductCounterTiny;
