import productsActions from "../src/redux/actions/products";
import { wrapper } from "../src/redux/store";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchPage from "../src/pages/search";

const { searchProducts } = productsActions;

const Search = ({ address, products, searchText }) => {
  return (
    <>
      <ShopHeader address={address} hideBackButton />

      <SearchPage products={products} searchText={searchText} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {
    store,
    query: { query },
  } = ctx;

  await store.dispatch(searchProducts(query));

  return {
    props: {
      searchText: query,
    },
  };
});

function mapStateToProps(state, props) {
  const { isSearching, productsResult } = state.Products;
  const { deliveryAddress } = state.Location;

  return {
    isSearching,
    products: productsResult,
    address: deliveryAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ searchProducts }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
