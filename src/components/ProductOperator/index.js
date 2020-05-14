import React, { useState, useCallback, useEffect } from "react";
import ProductCounter from "../ProductCounter";
import AddToCartButton from "../AddToCartButton";
import { ProductOperatorWrapper } from "./styled";

const ProductOperator = ({ basePrice, onAddToCart }) => {
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [totalCount, setTotalCount] = useState(1);

  const changeCount = useCallback(
    (count) => {
      setTotalPrice(count * basePrice);
      setTotalCount(count);
    },
    [setTotalPrice, basePrice]
  );

  const onAddToCartClick = useCallback(() => {
    onAddToCart(totalPrice, totalCount, basePrice);
  }, [totalPrice, totalCount, basePrice]);

  useEffect(() => {
    setTotalPrice(totalCount * basePrice);
  }, [basePrice, totalCount]);

  return (
    <ProductOperatorWrapper>
      <ProductCounter onChangeCount={changeCount} />
      <AddToCartButton price={totalPrice} onClick={onAddToCartClick} />
    </ProductOperatorWrapper>
  );
};

export default ProductOperator;
