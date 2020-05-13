import React from "react";
import {
  ProductItemWrapper,
  ProductMedia,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
} from "./styled";

const ProductItem = ({ product, onSelectProduct }) => {
  return (
    <ProductItemWrapper onClick={onSelectProduct}>
      <ProductMedia>
        <img src={product.image} />
      </ProductMedia>

      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>

        <ProductPrice>
          $ {`${new Intl.NumberFormat("es").format(product.usdPrice)}`}
        </ProductPrice>
      </ProductInfo>
    </ProductItemWrapper>
  );
};

export default ProductItem;
