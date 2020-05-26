import PartnerPlaceholder from "../ProductPlaceholder";
import { ProductsPlaceholderWrapper } from "./styled";

const ProductsPlaceholder = ({ rows = 1, children, ready }) => {
  const arr = [];

  for (let i = 0; i < rows; i++) {
    arr.push(null);
  }

  if (!ready) {
    return (
      <ProductsPlaceholderWrapper>
        {arr.map((a, index) => (
          <PartnerPlaceholder />
        ))}
      </ProductsPlaceholderWrapper>
    );
  } else {
    return <>{children}</>;
  }
};

export default ProductsPlaceholder;
