import { useCallback, useState, useEffect } from "react";
import {
  SearchPageWrapper,
  FiltersWrapper,
  ContentWrapper,
  ResultsTitle,
  MobileSearchWrapper,
} from "./styled";
import Filters from "../../components/SearchFilters";
import StoreResult from "../../components/StoreResult";
import HeaderSearchBox from "../../components/HeaderSearchBox";
import productsActions from "../../redux/actions/products";
import shoppingCartActions from "../../redux/actions/shoppingCart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductModal from "../../components/ProductModal";
import { useRouter } from "next/router";
import { normalizeProduct } from "../../utils";

const { fetchProduct, searchProducts } = productsActions;
const { addToCart } = shoppingCartActions;

const Search = ({
  product,
  results,
  searchText,
  type,
  actions: { fetchProduct, addToCart, searchProducts },
  partners,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSelected, setProductSelect] = useState();
  const [storeSelected, setStoreSelected] = useState();
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (product && storeSelected) {
      setIsModalOpen(true);
      setProductSelect(normalizeProduct(product, storeSelected));
    }
  }, [product, storeSelected]);

  const onAddProduct = useCallback((product, store) => {
    fetchProduct(product.id);
    setIsModalOpen(true);
    setProductSelect(product);
    setStoreSelected({
      id: store.id,
      logo: store.logo,
      slug: store.slug,
      location: store.location
        ? {
            lat: store.location._latitude,
            lng: store.location._longitude,
          }
        : {},
      commision: store.commision,
      commisionIncluded: store.commisionIncluded,
    });
  });

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setProductSelect(null);
    setStoreSelected(null);
  });

  const addProductToCart = useCallback(
    (order) => {
      addToCart({
        ...order,
        partner: {
          id: storeSelected.id,
          slug: storeSelected.slug,
          logo: storeSelected.logo,
          location: storeSelected.location ? storeSelected.location : null,
          commision: storeSelected.commision,
          commisionIncluded: storeSelected.commisionIncluded,
          promoDeliveryPrice: storeSelected.promoDeliveryPrice || null
        },
      });
      onCloseModal();
    },
    [storeSelected]
  );

  const onSelectFilter = useCallback(
    (filterType) => {
      if (filterType === "products") {
        router.push(`/search?query=${query}`, `/search?query=${query}`, {
          shallow: true,
        });
      } else {
        router.push(
          `/search?query=${query}&type=store`,
          `/search?query=${query}&type=store`,
          {
            shallow: true,
          }
        );
      }
    },
    [query]
  );

  return (
    <>
      <SearchPageWrapper>
        <div>
          <MobileSearchWrapper>
            <HeaderSearchBox />
          </MobileSearchWrapper>

          <FiltersWrapper>
            <Filters onSelectFilter={onSelectFilter} typeSelected={type} />
          </FiltersWrapper>

          <ContentWrapper>
            <ResultsTitle>Resultados para: {query}</ResultsTitle>

            {results &&
              Object.keys(results).map((key, index) => {
                return (
                  <StoreResult
                    store={results[key]}
                    key={index}
                    onShowProduct={onAddProduct}
                  />
                );
              })}
          </ContentWrapper>
        </div>

        <ProductModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          product={productSelected}
          onAccept={addProductToCart}
        />
      </SearchPageWrapper>
    </>
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators(
      { fetchProduct, addToCart, searchProducts },
      dispatch
    ),
  };
}

function mapStateToProps(state, props) {
  const { product } = state.Products;

  return {
    product,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
