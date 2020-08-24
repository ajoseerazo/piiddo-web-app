import React, { useState, useCallback, useEffect } from "react";
import ProductCounter from "../ProductCounter";
import AddToCartButton from "../AddToCartButton";
import { ProductOperatorWrapper } from "./styled";

const ProductOperator = ({ basePrice, onAddToCart, baseStorePrice }) => {
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [totalStorePrice, setTotalStorePrice] = useState(baseStorePrice);
  const [totalCount, setTotalCount] = useState(1);

  const changeCount = useCallback(
    (count) => {
      setTotalPrice(count * basePrice);
      setTotalStorePrice(count * baseStorePrice);
      setTotalCount(count);
    },
    [setTotalPrice, basePrice, baseStorePrice]
  );

  const onAddToCartClick = useCallback(() => {
    onAddToCart(
      totalPrice,
      totalCount,
      basePrice,
      totalStorePrice,
      baseStorePrice
    );
  }, [totalPrice, totalCount, basePrice, baseStorePrice, onAddToCart]);

  useEffect(() => {
    setTotalPrice(totalCount * basePrice);
    setTotalStorePrice(totalCount * baseStorePrice);
  }, [basePrice, totalCount, baseStorePrice]);

  return (
    <ProductOperatorWrapper>
      <ProductCounter onChangeCount={changeCount} />
      <AddToCartButton price={totalPrice} onClick={onAddToCartClick} />
    </ProductOperatorWrapper>
  );
};

export default ProductOperator;
