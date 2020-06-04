import React, { Component, Suspense } from "react";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import Footer from "../src/components/Footer";
import { InView } from "react-intersection-observer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import productsActions from "../src/redux/actions/products";
import categoriesActions from "../src/redux/actions/categories";
import locationActions from "../src/redux/actions/location";
import ProductModal from "../src/components/ProductModal";
import GlobalSearch from "../src/components/GlobalSearch";
import Categories from "../src/components/Categories";
import { MainContainerWrapper } from "../src/globalStyles/styled.index";
import {
  PageMainContainerStyled,
  ProductsContainer,
  SectionNameStyled
} from "../src/globalStyles/pages.styled";
import { wrapper } from "../src/redux/store";
import Toolbar from "../src/components/Toolbar";

const { fetchProducts, selectProduct } = productsActions;
const { fetchCategories } = categoriesActions;
const { setDeliveryPlace } = locationActions;

class Shop extends Component {
  state = {
    itemsInCart: [],
    isSticky: false,
    footerIsVisible: false,
    address: this.props.address,
    sidebarHeight: "auto",
  };

  constructor(props) {
    super(props);

    this.footer = React.createRef();
  }

  onAddProduct(product) {
    let { itemsInCart } = this.state;

    const index = itemsInCart.findIndex((item) => item.id === product.id);

    if (index === -1) {
      itemsInCart = itemsInCart.concat(product);
    } else {
      itemsInCart[index].length = itemsInCart[index].length + 1;
      itemsInCart = itemsInCart.slice();
    }

    this.setState({
      itemsInCart: itemsInCart,
    });
  }

  openProduct = (product) => {
    const {
      actions: { selectProduct },
    } = this.props;

    selectProduct(product);
  };

  onSelectPlace = (place) => {
    this.setState({
      place,
      isPlacePickerModalOpened: true,
      showAutocomplete: false,
    });
  };

  onFooterVisibiltyChange = (isVisible) => {
    // this.setSidebarHeight(isVisible);
  };

  onCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  closePlacePickerModal = () => {
    this.setState({
      isPlacePickerModalOpened: false,
    });
  };

  onSetAddress = (place) => {
    const {
      actions: { setDeliveryPlace },
    } = this.props;

    this.closePlacePickerModal();

    setDeliveryPlace(place);

    this.setState({
      address: place.address,
    });
  };

  onClickAddressSelector = () => {
    this.setState({
      isPlacePickerModalOpened: true,
      showAutocomplete: true,
    });
  };

  render() {
    const {
      itemsInCart,
      isSticky,
      sidebarHeight,
      isModalOpen,
      isPlacePickerModalOpened,
      place,
      address,
      showAutocomplete,
    } = this.state;
    const { categories } = this.props;

    return (
      <>
        <ShopHeader
          address={address}
          hideBackButton
          onClickAddressSelector={this.onClickAddressSelector}
        />

        <PageMainContainerStyled>
          <ProductsContainer
            style={{
              minHeight:
                typeof window !== "undefined"
                  ? window.innerHeight - 57
                  : "auto",
            }}
          >
            <GlobalSearch
              address={address}
              onSelectPlace={this.onSelectPlace}
            />

            <MainContainerWrapper>
              <SectionNameStyled>
                ¿Qué clase de producto deseas pedir hoy?
              </SectionNameStyled>

              <Categories categories={categories || []} />
            </MainContainerWrapper>
          </ProductsContainer>
        </PageMainContainerStyled>

        <Toolbar />

        <InView
          as="div"
          ref={this.footer}
          onChange={(inView, entry) => {
            this.setState({
              footerIsVisible: inView,
            });

            this.onFooterVisibiltyChange(inView);
          }}
        >
          <Footer onVisibilityChange={this.onFooterVisibiltyChange} />
        </InView>

        <ProductModal isOpen={isModalOpen} onClose={this.onCloseModal} />
      </>
    );
  }
}

function mapStateToProps(state, props) {
  const { categories } = state.Categories;

  return {
    categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { fetchProducts, selectProduct, setDeliveryPlace },
      dispatch
    ),
  };
}

export const getStaticProps = wrapper.getStaticProps(async (ctx) => {
  const { store } = ctx;

  await store.dispatch(fetchCategories());
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
