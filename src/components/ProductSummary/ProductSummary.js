import React, { Component } from "react";
import AddProductButton from "../AddProductButton/AddProductButton";
import Link from "next/link";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BuyButton from "../BuyButton";

import "./ProductSummary.scss";

class ProductSummary extends Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  render() {
    let { product, onAdd, rate, currency_code } = this.props;

    return (
      <div className="product-summary" ref={this.wrapper}>
        <Link href={`/products/${product.id}`}>
          <a>
            <div
              className="product-name"
              style={{
                width: this.wrapper.current
                  ? this.wrapper.current.clientWidth
                  : 0
              }}
            >
              {product.name}
            </div>

            <div className="product-img">
              <img src={product.image} />
            </div>

            <div className="product-info">
              <div className="product-price">
                {`${new Intl.NumberFormat("es").format(product.price * rate)} ${currency_code}`}
              </div>

              <div className="product-description">{product.description}</div>
            </div>
          </a>
        </Link>

        <div className="add-product-button-wrapper">
          {/*<AddProductButton
            onClick={() => {
              onAdd(product);
            }}
          >
            Lo quiero comprar
          </AddProductButton>*/}
          <BuyButton product={product} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { rate, currency_code } = state.App.toJS();

  return {
    rate,
    currency_code
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSummary);
