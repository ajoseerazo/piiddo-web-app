import { useCallback } from "react";
import StoreResult from "../components/StoreResult";
import productsActions from "../redux/actions/products";
import shoppingCartActions from "../redux/actions/shoppingCart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { fetchProduct } = productsActions;
const { addToCart } = shoppingCartActions;

const StoreResultContainer = (props) => {
  const showProduct = useCallback((product) => {
    props.actions.fetchProduct(product.id);
  });

  const addProductToCart = useCallback((order, partner) => {
    props.actions.addToCart({
      ...order,
      partner: {
        id: partner.id,
        slug: partner.slug,
        logo: partner.logo,
        location: partner.location ? partner.location : null,
      },
    });
  });

  return (
    <StoreResult
      {...props}
      onShowProduct={showProduct}
      onAddProductToCart={addProductToCart}
    />
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators({ fetchProduct, addToCart }, dispatch),
  };
}

function mapStateToProps(state, props) {
  const { product } = state.Products;

  return {
    product,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreResultContainer);
