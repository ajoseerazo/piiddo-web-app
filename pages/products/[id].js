import ShopHeader from "../../src/components/ShopHeader/ShopHeader";
import Sidebar from "../../src/components/Sidebar";
import { useRouter } from "next/router";
import productsActions from "../../src/redux/actions/products";
import { getCategoryName } from "../../src/utils";
import { Row, Col } from "reactstrap";
import Footer from '../../src/components/Footer'
import Breadcumb from "../../src/components/Breadcumb"
import { bindActionCreators } from "redux"
import { connect } from "react-redux";
import "./styles.scss";
import BuyButton from "../../src/components/BuyButton";

const { fetchProduct } = productsActions;

const Product = props => {
  const { product, rate, currency_code } = props;

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <ShopHeader />

      <div className="main-container" style={{ marginTop: 57 }}>
        <Sidebar />

        <div className="product-container-wrapper">
          
          <Breadcumb items={[
            {
              url: "/",
              name: "Inicio"
            },
            {
              url: `/${product.category}`,
              name: getCategoryName(product.category)
            },
            {
              url: `/products/${product.id}`,
              name: product.name
            }
          ]} />
          
          <div className="product-container">
            <div className="product-container-info">
              <Row>
                <Col md="6" className="product-container-left">
                  <img src={product.images[0]} alt={product.name} />
                </Col>

                <Col md="6" className="product-container-right">
                  <h1>{product.name}</h1>

                  <div className="price">{`${new Intl.NumberFormat("es").format(product.price * rate)} ${currency_code}`}</div>

                  <div className="description">{product.description}</div>

                  <BuyButton product={product} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

Product.getInitialProps = async ({ store, query }) => {
  const product = await store.dispatch(fetchProduct(query.id));

  return {
    product
  };
};

function mapStateToProps(state, props) {
  const { rate, currency_code } = state.App.toJS();

  return {
    rate,
    currency_code
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ }, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);
