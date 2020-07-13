import React, { useState, useEffect } from "react";
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
import useUser from "../../hooks/useUser";

library.add([faTimes, faShoppingBag]);

const ShoppingCartDetails = (props) => {
  const user = useUser();

  const [state, setState] = useState({
    active: false,
    autoplay: false,
    overlayClass: "",
    mainClass: "",
  });

  const openAction = () => {
    document.body.style.overflowY = "hidden";
    setState((prevState, props) => {
      return {
        active: true,
        autoplay: true,
        overlayClass: `overflow`,
        mainClass: `show`,
      };
    });
  };

  useEffect(() => {
    if (props.isOpen) {
      openAction();
    } else {
      closeAction();
    }
  }, [props.isOpen]);

  const closeAction = () => {
    document.body.style.overflowY = "auto";
    setState((prevState, props) => {
      return {
        active: false,
        autoplay: true,
        mainClass: ``,
        overlayClass: ``,
      };
    });
  };

  /*componentWillReceiveProps() {
    setState({ autoplay: false });
  }

  checkoutAction = () => {};*/

  /*onClose = () => {
    if (!state.active) {
    }
  };*/
  let length = props.length;
  let amount = props.amount;
  let domicilio = state.domicilio || 1000;

  const { overlayClass, mainClass } = state;

  const { deliveryTotal, onRequestClose } = props;

  return (
    <div>
      <ShoppingCartWrapper className={mainClass}>
        <ShoppingCartHeader>
          <span className="title">Tu pedido</span>

          <span onClick={onRequestClose}>
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
                style={{
                  overflow: "hidden",
                }}
              >
                <div className="articles-shoppingBox">{props.children}</div>
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
            <div onClick={onRequestClose}>
              <Link
                href={user ? "/checkout" : "/ingresar?redirect_to=checkout"}
                as={user ? "/checkout" : "/ingresar?redirect_to=checkout"}
              >
                <CheckoutButtonStyled block className="checkout-btn">
                  Pagar
                </CheckoutButtonStyled>
              </Link>
            </div>
          </CartSummary>
        )}
      </ShoppingCartWrapper>

      <Overlay className={overlayClass} onClick={onRequestClose}></Overlay>
    </div>
  );
};

export default ShoppingCartDetails;
