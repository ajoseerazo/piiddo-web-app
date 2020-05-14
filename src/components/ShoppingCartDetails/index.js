import React, { PureComponent } from "react";
import FontAwesome from "react-fontawesome";
import Anime from "react-anime";
// import { createPortal } from "react-dom";
import { Col, Button } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

library.add([faTimes]);

import "./styles.scss";

class ShoppingCartDetails extends PureComponent {
  state = {
    active: false,
    autoplay: false,
    overlayClass: "cardOverlay",
    mainClass: "card",
  };

  openAction = () => {
    document.body.style.overflowY = "hidden";
    this.setState((prevState, props) => {
      return {
        active: true,
        autoplay: true,
        overlayClass: `cardOverlay overflow`,
        mainClass: `card show`,
      };
    });
  };

  closeAction = () => {
    document.body.style.overflowY = "auto";
    this.setState((prevState, props) => {
      return {
        active: false,
        autoplay: true,
        mainClass: `card`,
        overlayClass: `cardOverlay`,
      };
    });
  };

  componentWillReceiveProps() {
    this.setState({ autoplay: false });
  }

  checkoutAction = () => {};

  onClose = () => {
    if (!this.state.active) {
    }
  };

  render() {
    let length = this.props.length;
    let amount = this.props.amount;
    let domicilio = this.state.domicilio || 1000;

    const { overlayClass, mainClass } = this.state;

    const { deliveryTotal } = this.props;

    return (
      <div>
        <div className={mainClass}>
          <div className="card-header">
            <span className="title">Tu pedido</span>

            <span onClick={this.closeAction}>
              <Button className="btn-close">
                <span>Cerrar</span>

                <FontAwesomeIcon icon="times" />
              </Button>
            </span>
          </div>
          <div className="card-items card-center">
            <div>
              {length === 0 ? (
                <h3 className="card-title">
                  <FontAwesome
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "0.5em 0em",
                      fontSize: "2em",
                    }}
                    name="shopping-bag"
                  />
                  Tu carrito está vacío
                </h3>
              ) : (
                <div className="containerShoppingArticles">
                  <Scrollbars
                    autoHeight
                    autoHeightMax={"100%"}
                    autoHeightMin={0}
                    ref="scrollbars"
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <div className="articles-shoppingBox">
                      {this.props.children}
                    </div>
                  </Scrollbars>
                </div>
              )}
            </div>
          </div>
          {length !== 0 && (
            <div className="card-result align">
              <div>
                <div className="card-adm">
                  Costo delivery
                  <span className="card-mount">
                    $ {parseFloat(deliveryTotal).toFixed(2)}
                  </span>
                </div>
                <span className="card-total">
                  Total
                  <span className="card-mount">
                    $ {parseFloat(amount + deliveryTotal).toFixed(2)}
                  </span>
                </span>
              </div>
              <div onClick={this.closeAction}>
                <Link href="/checkout" as="/checkout">
                  <Button block className="checkout-btn">
                    Pagar
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className={overlayClass} onClick={this.closeAction}></div>
      </div>
    );
  }
}

export default ShoppingCartDetails;
