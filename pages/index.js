import React, { Component } from "react";
import ShopHeader from "../src/components/ShopHeader/ShopHeader";
import ProductsGallery from "../src/components/ProductsGallery/ProductsGallery";
import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart";
import ShoppingCartList from "../src/components/ShoppingCart/ShoppingCartList";
import Sidebar from '../src/components/Sidebar'
import Footer from '../src/components/Footer'
import { InView } from 'react-intersection-observer'
import { bindActionCreators } from "redux"
import { connect } from "react-redux";
import productsActions from "../src/redux/actions/products"
import ProductModal from "../src/components/ProductModal"
import "../src/styles.scss";
import "../src/shop-styles.scss";

const {
  fetchProducts,
  selectProduct
} = productsActions

/*const products = [
  {
    img: "/static/images/mavesa.png",
    price: 8000,
    name: "Mantequilla Mavesa",
    description: "Mantequilla Mavesa 500gr",
    length: 1,
    id: 1
  },
  {
    img: "/static/images/harina-pan.jpg",
    price: 6000,
    name: "Harina Pan",
    description: "Harina Pan 1 kg",
    length: 1,
    id: 2
  },
  {
    img:
      "/static/images/diablitos.png",
    price: 4500,
    name: "Diablitos",
    description: "Diablitos 100gr",
    length: 1,
    id: 3
  },
  {
    img:
      "https://floristeriagenesis.com/wp-content/uploads/2018/01/regalo-para-cada-ocasion.fw_-300x233.png",
    price: 3500,
    name: "Arreglo floral",
    description: "Arreglo de flores a tu gusto",
    length: 1,
    id: 4
  },
  {
    img:
      "https://i.pinimg.com/originals/c2/f6/fa/c2f6fadf65a566425c8746d824e8be04.jpg",
    price: 40000,
    name: "Cartera para dama",
    description: "Hermosa cartera para dama de color rosado",
    length: 1,
    id: 5
  },
  {
    img:
      "https://bucaramanga.gruposotillo.com/wp-content/uploads/2014/08/black-label-750.png",
    price: 20000,
    name: "Botella de whiskey",
    description: "Botella de Whiskey Black Label",
    length: 1,
    id: 6
  },
  {
    img: "https://www.gaiaspa.com.mx/WP/wp-content/uploads/2018/02/mujer.png",
    price: 12000,
    name: "Spa",
    description: "Tratamiento en Spa",
    length: 1,
    id: 7
  },
  {
    img:
      "https://2.bp.blogspot.com/-A_ZA9bXsZTQ/WqnXwEhcnKI/AAAAAAAIIJs/s3KWPXg9Xa4ZyITcKkgPg8G4SxEkpLSJQCLcBGAs/s400/NATOM%25C3%258DA%2BHUMANA%2B%2528U%25C3%2591AS%2529%2B%252832%2529.png",
    price: 7000,
    name: "Manicure",
    description: "Tratamiento de belleza para sus manos",
    length: 1,
    id: 8
  },
  {
    img:
      "https://banner2.kisspng.com/20180607/boh/kisspng-samsung-galaxy-j5-samsung-galaxy-j7-pro-smartphone-samsung-j7-prime-5b18fbb0618b61.8719324415283639523996.jpg",
    price: 256000,
    name: "Samsumg J5",
    description: "Teléfono Samsumg J5 liberado",
    length: 1,
    id: 9
  },
  {
    img: "https://www.ootb.de/files/product_images/61-6948.png",
    name: "Peluche Te Amo",
    description: "Peluche blanco con corazón que dice Te Amo",
    price: 12500,
    length: 1,
    id: 10
  },
  {
    img:
      "https://nicolukas.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/u/guanabana_1.png",
    name: "Torta tres leches",
    description: "Rica torta tres leches con polvoreado de chocolate",
    price: 15000,
    length: 1,
    id: 11
  },
  {
    img:
      "https://www.frutasyfresas.com/172-large_default/magestic.jpg",
    name: "Arreglo de frutas",
    description: "Arreglo de frutas con chocolates",
    price: 7500,
    length: 1,
    id: 12
  },
  {
    img: "https://www.trzcacak.rs/myfile/full/205-2054630_ferrero-nutella-nutella-chocolate.png",
    name: "Nutella",
    description: "Pote de Nutella de 250g",
    price: 13500,
    length: 1,
    id: 13
  },
  {
    img:
      "https://vignette.wikia.nocookie.net/monster-legends-rumores/images/d/dd/Caja_Bombones.png/revision/latest?cb=20150506171150&path-prefix=es",
    name: "Caja de bombones",
    description: "Caja de Bombones de 16 piezas",
    price: 5000,
    length: 1,
    id: 14
  }
];*/

class Shop extends Component {
  state = {
    itemsInCart: [],
    isSticky: false,
    footerIsVisible: false,
    sidebarHeight: "auto"
  };

  constructor (props) {
    super(props);
    this.footer = React.createRef();
  }

  static async getInitialProps({store, isServer, pathname, query}) {
    const products = await store.dispatch(fetchProducts()); 
    
    return { products };
  }

  onAddProduct(product) {
    let { itemsInCart } = this.state;

    const index = itemsInCart.findIndex(item => item.id === product.id);

    if (index === -1) {
      itemsInCart = itemsInCart.concat(product);
    } else {
      itemsInCart[index].length = itemsInCart[index].length + 1;
      itemsInCart = itemsInCart.slice();
    }

    this.setState({
      itemsInCart: itemsInCart
    });
  }

  openProduct = (product) => {
    const { actions: { selectProduct } } = this.props

    selectProduct(product);

    /*this.setState({
      isModalOpen: true
    })*/
  }

  setSidebarHeight = (isVisible) => {
    if (isVisible) {
      let height = window.innerHeight - this.footer.current.node.getBoundingClientRect().top
          
      if (height > 0) {
        this.setState({
          sidebarHeight: window.innerHeight - 54 - height
        })
      } else {
        this.setState({
          sidebarHeight: window.innerHeight - 54
        })
      }
    } else {
      this.setState({
        sidebarHeight: window.innerHeight - 54
      })
    }
  }

  onFooterVisibiltyChange = (isVisible) => {
    this.setSidebarHeight(isVisible)
  }

  componentDidMount = () => {
    if (window.scrollY > 160) {
      this.setState({
        isSticky: true
      })
    }

    window.onscroll = () => {
      if (window.scrollY > 160) {
        this.setState({
          isSticky: true
        })
      }

      window.onscroll = () => {
        if (window.scrollY > 160) {
          this.setState({
            isSticky: true
          })
        } else {
          this.setState({
            isSticky: false
          })
        }

        this.setSidebarHeight(this.state.footerIsVisible);
      }
    }
  }

  onCloseModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  render() {
    const { itemsInCart, isSticky, sidebarHeight, isModalOpen } = this.state;
    const { products } = this.props

    return (
      <>
        <ShopHeader />

        <div className="banner" style={{marginTop: 60, padding: 40, textAlign: "center", fontFamily: "Poppins"}}>
          <h1 style={{
            fontSize: '1.6rem',
            color: '#546068'
          }}>Haz regalos a tus seres queridos en <span style={{color: '#f969b3'}}>Mérida</span>, estés donde estés</h1>
          <h1 style={{
            fontSize: '1.6rem',
            color: '#546068'
          }}>y pagando en tu <span style={{color: '#f969b3'}}>moneda local</span></h1>
        </div>

        <div className="main-container">
          <Sidebar isSticky={isSticky} height={sidebarHeight} />
          
          <div className="products-container">
            <h1 className="section-name">Todos</h1>

            <ProductsGallery
              products={products}
              onAddProduct={this.onAddProduct.bind(this)}
              onClickProduct={this.openProduct}
            />
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

        <InView as="div" ref={this.footer} onChange={(inView, entry) => {
          this.setState({
            footerIsVisible: inView
          })

          this.onFooterVisibiltyChange(inView);
        }}>
          <Footer onVisibilityChange={this.onFooterVisibiltyChange} />
        </InView>

        <ProductModal isOpen={isModalOpen} onClose={this.onCloseModal} />
      </>
    );
  }
}

function mapStateToProps(state, props) {
  const { products } = props

  return {
    products
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchProducts, selectProduct }, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shop);