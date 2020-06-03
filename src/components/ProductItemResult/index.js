import {
  ProductWrapper,
  ProductImage,
  ProductInfoWrapper,
  ProductPrice,
  ProductName,
  ProductAddButton,
} from "./styled";

const ProductItemResult = ({ product }) => {
  return (
    <ProductWrapper>
      <ProductImage src={product.image} />
      <ProductInfoWrapper>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.usdPrice} $</ProductPrice>
      </ProductInfoWrapper>

      <ProductAddButton>Agregar</ProductAddButton>
    </ProductWrapper>
  );
};

export default ProductItemResult;
