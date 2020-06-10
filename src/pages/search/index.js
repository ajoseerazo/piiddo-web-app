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

const { fetchProduct } = productsActions;
const { addToCart } = shoppingCartActions;

const Search = ({
  product,
  products,
  searchText,
  actions: { fetchProduct, addToCart },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSelected, setProductSelect] = useState();
  const [storeSelected, setStoreSelected] = useState();

  useEffect(() => {
    if (product) {
      setIsModalOpen(true);
      setProductSelect(product);
    }
  }, [product]);

  const onAddProduct = useCallback((product, store) => {
    fetchProduct(product.id);
    setIsModalOpen(true);
    setProductSelect(product);
    setStoreSelected({
      id: store.id,
      logo: store.logo,
      slug: store.slug,
      location: {
        lat: store.location._latitude,
        lng: store.location._longitude,
      },
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
        },
      });
      onCloseModal();
    },
    [storeSelected]
  );

  return (
    <>
      <SearchPageWrapper>
        <div>
          <MobileSearchWrapper>
            <HeaderSearchBox />
          </MobileSearchWrapper>

          <FiltersWrapper>
            <Filters />
          </FiltersWrapper>

          <ContentWrapper>
            <ResultsTitle>Resultados para: {searchText}</ResultsTitle>

            {products &&
              Object.keys(products).map((key, index) => {
                return (
                  <StoreResult
                    store={products[key]}
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
    actions: bindActionCreators({ fetchProduct, addToCart }, dispatch),
  };
}

function mapStateToProps(state, props) {
  const { product } = state.Products;

  return {
    product,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
