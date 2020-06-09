import {
  ProductWrapper,
  ProductImage,
  ProductInfoWrapper,
  ProductPrice,
  ProductName,
  ProductAddButton,
} from "./styled";

const ProductItemResult = ({ product, onAddProduct }) => {
  return (
    <ProductWrapper>
      <ProductImage src={product.image} />
      <ProductInfoWrapper>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.usdPrice} $</ProductPrice>
      </ProductInfoWrapper>

      <ProductAddButton onClick={onAddProduct}>Agregar</ProductAddButton>
    </ProductWrapper>
  );
};

export default ProductItemResult;
