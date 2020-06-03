import { useEffect, useState } from "react";
import productsActions from "../src/redux/actions/products";
import { wrapper } from "../src/redux/store";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchPage from "../src/pages/search";
import { useRouter } from "next/router";
import Toolbar from "../src/components/Toolbar";

const { searchProducts } = productsActions;

const Search = ({
  address,
  products,
  searchText,
  actions: { searchProducts },
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();
  const [currentQuery, setCurrentQuery] = useState(searchText);

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);
      }
    } else {
      const {
        query: { query },
      } = router;

      if (query !== currentQuery) {
        searchProducts(query);
        setCurrentQuery(query);
      }
    }
  }, [currentQuery, isBrowser, router.query]);

  return (
    <>
      <ShopHeader address={address} />

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
