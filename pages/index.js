import React, { Component } from "react";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import ProductsGallery from "../src/components/ProductsGallery/ProductsGallery";
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart";
import ShoppingCartList from "../src/components/ShoppingCart/ShoppingCartList";
import Sidebar from "../src/components/Sidebar";
import Footer from "../src/components/Footer";
import { InView } from "react-intersection-observer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import productsActions from "../src/redux/actions/products";
import partnersActions from "../src/redux/actions/partners";
import categoriesActions from "../src/redux/actions/categories";
import ProductModal from "../src/components/ProductModal";
import { getCategoryName } from "../src/utils";
import "../src/styles.scss";
import "../src/shop-styles.scss";
import Banner from "../src/components/Banner";
import GlobalSearch from "../src/components/GlobalSearch";
import Category from "../src/components/Category";

const { fetchProducts, selectProduct } = productsActions;
const { fetchPartners } = partnersActions;
const { fetchCategories } = categoriesActions;

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
    sidebarHeight: "auto",
  };

  constructor(props) {
    super(props);
    this.footer = React.createRef();
  }

  static async getInitialProps({ store, isServer, pathname, query }) {
    // const products = await store.dispatch(fetchProducts());
    const partners = await store.dispatch(fetchPartners());
    const categories = await store.dispatch(fetchCategories());

    return { partners, categories };
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

  setSidebarHeight = (isVisible) => {
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
  };

  onFooterVisibiltyChange = (isVisible) => {
    this.setSidebarHeight(isVisible);
  };

  componentDidMount = () => {
    if (window.scrollY > 160) {
      this.setState({
        isSticky: true,
      });
    }

    window.onscroll = () => {
      if (window.scrollY > 160) {
        this.setState({
          isSticky: true,
        });
      }

      window.onscroll = () => {
        if (window.scrollY > 160) {
          this.setState({
            isSticky: true,
          });
        } else {
          this.setState({
            isSticky: false,
          });
        }

        this.setSidebarHeight(this.state.footerIsVisible);
      };
    };
  };

  onCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { itemsInCart, isSticky, sidebarHeight, isModalOpen } = this.state;
    const { products, category, partners, categories } = this.props;

    console.log("P", partners.length);

    return (
      <>
        <ShopHeader />

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
              style={{
                marginBottom: 40,
              }}
            />

            <h1 className="section-name">¿Qué deseas comprar hoy?</h1>

            {/*<ProductsGallery
              products={products}
              onAddProduct={this.onAddProduct.bind(this)}
              onClickProduct={this.openProduct}
            />*/}
            {categories.map((cat) => (
              <Category name={cat.name} image={cat.image} />
            ))}

            {process.browser && itemsInCart.length !== 0 && (
              <ShoppingCart
                amount={itemsInCart.reduce(
                  (sum, item) => (sum = sum + item.price * item.length),
                  0
                )}
              >
                <ShoppingCartList items={itemsInCart} />
              </ShoppingCart>
            )}
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
    actions: bindActionCreators({ fetchProducts, selectProduct }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
