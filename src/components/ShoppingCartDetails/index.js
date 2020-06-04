import React, { PureComponent } from "react";
import { Button } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import {
  ShoppingCartHeader,
  ShoppingCartWrapper,
  Overlay,
  CartContainer,
  EmptyCartContainer,
  CartSummary,
  DeliverySummary,
  Amount,
  TotalSummary,
  CheckoutButtonStyled,
} from "./styled";

library.add([faTimes, faShoppingBag]);

// import "./styles.scss";

class ShoppingCartDetails extends PureComponent {
  state = {
    active: false,
    autoplay: false,
    overlayClass: "",
    mainClass: "",
  };

  openAction = () => {
    document.body.style.overflowY = "hidden";
    this.setState((prevState, props) => {
      return {
        active: true,
        autoplay: true,
        overlayClass: `overflow`,
        mainClass: `show`,
      };
    });
  };

  closeAction = () => {
    document.body.style.overflowY = "auto";
    this.setState((prevState, props) => {
      return {
        active: false,
        autoplay: true,
        mainClass: ``,
        overlayClass: ``,
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
        <ShoppingCartWrapper className={mainClass}>
          <ShoppingCartHeader>
            <span className="title">Tu pedido</span>

            <span onClick={this.closeAction}>
              <Button className="btn-close">
                <span>Cerrar</span>

                <FontAwesomeIcon icon="times" />
              </Button>
            </span>
          </ShoppingCartHeader>
          <CartContainer>
            {length === 0 ? (
              <EmptyCartContainer>
                <h3>
                  <FontAwesomeIcon icon="shopping-bag" color="#443" size="2x" />
                  <div>Tu carrito está vacío</div>
                </h3>
              </EmptyCartContainer>
            ) : (
              <div>
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
          </CartContainer>
          {length !== 0 && (
            <CartSummary>
              <div>
                <DeliverySummary>
                  Costo delivery
                  <Amount>$ {parseFloat(deliveryTotal).toFixed(2)}</Amount>
                </DeliverySummary>
                <TotalSummary>
                  Total
                  <Amount>
                    $ {parseFloat(amount + deliveryTotal).toFixed(2)}
                  </Amount>
                </TotalSummary>
              </div>
              <div onClick={this.closeAction}>
                <Link href="/checkout" as="/checkout">
                  <CheckoutButtonStyled block className="checkout-btn">
                    Pagar
                  </CheckoutButtonStyled>
                </Link>
              </div>
            </CartSummary>
          )}
        </ShoppingCartWrapper>

        <Overlay className={overlayClass} onClick={this.closeAction}></Overlay>
      </div>
    );
  }
}

export default ShoppingCartDetails;
