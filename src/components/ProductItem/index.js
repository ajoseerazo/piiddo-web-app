import React from "react";
import {
  ProductItemWrapper,
  ProductMedia,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  ProductAddButton,
} from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add([faPlus]);

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
          ${" "}
          {`${new Intl.NumberFormat("es").format(
            parseFloat(product.finalPrice).toFixed(2)
          )}`}
        </ProductPrice>

        <ProductAddButton>
          <FontAwesomeIcon icon="plus" />
        </ProductAddButton>
      </ProductInfo>
    </ProductItemWrapper>
  );
};

export default ProductItem;
