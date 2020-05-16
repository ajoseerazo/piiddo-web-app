import React, { Component, Suspense } from "react";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import ProductsGallery from "../src/components/ProductsGallery/ProductsGallery";
import Sidebar from "../src/components/Sidebar";
import Footer from "../src/components/Footer";
import { InView } from "react-intersection-observer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import productsActions from "../src/redux/actions/products";
import partnersActions from "../src/redux/actions/partners";
import categoriesActions from "../src/redux/actions/categories";
import locationActions from "../src/redux/actions/location";
import ProductModal from "../src/components/ProductModal";
import { getCategoryName } from "../src/utils";
import "../src/styles.scss";
import "../src/shop-styles.scss";
import Banner from "../src/components/Banner";
import GlobalSearch from "../src/components/GlobalSearch";
import Category from "../src/components/Category";
import Categories from "../src/components/Categories";
import { MainContainerWrapper } from "../src/globalStyles/styled.index";
import PlacePickerModal from "../src/components/PlacePickerModal";
import API from "../src/api";
import cookies from "next-cookies";

const { fetchProducts, selectProduct } = productsActions;
const { fetchPartners } = partnersActions;
const { fetchCategories } = categoriesActions;
const { setDeliveryPlace } = locationActions;

const categories = [
  {
    name: "Restaurantes",
    id: "res",
  },
];

class Shop extends Component {
  state = {
    itemsInCart: [],
    isSticky: false,
    footerIsVisible: false,
    address: this.props.address,
    sidebarHeight: "auto"
  };

  constructor(props) {
    super(props);
    this.footer = React.createRef();
  }

  static async getInitialProps(ctx) {
    // const products = await store.dispatch(fetchProducts());
    const { store, isServer, pathname, query } = ctx;

    const partners = await store.dispatch(fetchPartners());
    const categories = await store.dispatch(fetchCategories());

    const address = cookies(ctx).deliveryAddress;

    return { partners, categories, address };
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

    /*this.setState({
      isModalOpen: true
    })*/
  };

  onSelectPlace = (place) => {
    this.setState({
      place,
      isPlacePickerModalOpened: true,
    });
  };

  /*setSidebarHeight = (isVisible) => {
    if (isVisible) {
      let height =
        window.innerHeight -
        this.footer.current.node.getBoundingClientRect().top;

      if (height > 0) {
        this.setState({
          sidebarHeight: window.innerHeight - 54 - height,
        });
      } else {
        this.setState({
          sidebarHeight: window.innerHeight - 54,
        });
      }
    } else {
      this.setState({
        sidebarHeight: window.innerHeight - 54,
      });
    }
  };*/

  onFooterVisibiltyChange = (isVisible) => {
    // this.setSidebarHeight(isVisible);
  };

  /*componentDidMount = () => {
    if (typeof window !== "undefined") {
      const place = API.DeliveryLocation.get();

      if (place) {
        this.setState({
          address: place.address,
        });
      }
    }
  };*/

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

  render() {
    const {
      itemsInCart,
      isSticky,
      sidebarHeight,
      isModalOpen,
      isPlacePickerModalOpened,
      place,
      address,
    } = this.state;
    const { products, category, partners, categories } = this.props;

    return (
      <>
        <ShopHeader address={address} />

        {/*<div style={{marginTop: 57}}>
          <Banner />
    </div>*/}

        <div className="main-container">
          {/*<Sidebar isSticky={isSticky} height={sidebarHeight} />*/}

          <div
            className="products-container"
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
              <h1 className="section-name">
                ¿Qué clase de producto deseas comprar?
              </h1>

              <Categories categories={categories || []} />
            </MainContainerWrapper>
          </div>
        </div>

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

        {!address && (
          <PlacePickerModal
            isOpen={isPlacePickerModalOpened}
            place={place}
            onClose={this.closePlacePickerModal}
            onAccept={this.onSetAddress}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state, props) {
  const { products } = props;

  return {
    products,
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

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
