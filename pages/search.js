import { useEffect, useState } from "react";
import productsActions from "../src/redux/actions/products";
import partnersActions from "../src/redux/actions/partners";
import { wrapper } from "../src/redux/store";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchPage from "../src/pages/search";
import { useRouter } from "next/router";

const { searchProducts } = productsActions;
const { searchPartners } = partnersActions;

const Search = ({
  address,
  products,
  searchText,
  actions: { searchProducts, searchPartners },
  partners,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();
  const [currentQuery, setCurrentQuery] = useState(searchText);
  const {
    query: { query, type },
  } = router;

  useEffect(() => {
    if (!isBrowser) {
      if (typeof window !== "undefined") {
        setIsBrowser(true);
      }
    } else {
      const {
        query: { query, type },
      } = router;

      if (type !== "store") {
        if (query /* !== currentQuery*/) {
          searchProducts(query);
          setCurrentQuery(query);
        }
      } else {
        searchPartners(query);
      }
    }
  }, [currentQuery, isBrowser, router, router.query]);

  return (
    <>
      <ShopHeader address={address} />

      <SearchPage
        results={type === "store" ? partners : products}
        searchText={searchText}
        type={type}
      />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {
    store,
    query: { query, type },
  } = ctx;

  if (type !== "store") {
    await store.dispatch(searchProducts(query));
  } else {
    await store.dispatch(searchPartners(query));
  }

  return {
    props: {
      searchText: query,
    },
  };
});

function mapStateToProps(state, props) {
  const { isSearching, productsResult } = state.Products;
  const { deliveryAddress } = state.Location;
  const { partnersResult } = state.Partners;

  return {
    isSearching,
    products: productsResult,
    address: deliveryAddress,
    partners: partnersResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ searchProducts, searchPartners }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
