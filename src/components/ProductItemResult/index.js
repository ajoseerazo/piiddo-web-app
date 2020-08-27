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
    <ProductWrapper onClick={onAddProduct}>
      <ProductImage src={product.image} />
      <ProductInfoWrapper>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>
          {parseFloat(product.finalPrice).toFixed(2)} $
        </ProductPrice>
      </ProductInfoWrapper>

      <ProductAddButton>Agregar</ProductAddButton>
    </ProductWrapper>
  );
};

export default ProductItemResult;
