import React from "react";
import {
  ProductItemWrapper,
  ProductMedia,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
} from "./styled";

const ProductItem = ({ product }) => {
  return (
    <ProductItemWrapper>
      <ProductMedia>
        <img src={product.image} />
      </ProductMedia>

      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>

        <ProductPrice>
          Bs. {`${new Intl.NumberFormat("es").format(product.price)}`}
        </ProductPrice>
      </ProductInfo>
    </ProductItemWrapper>
  );
};

export default ProductItem;
