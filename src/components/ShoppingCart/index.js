import React from "react";
import PropTypes from "prop-types";
import { ButtonStyled, ShoppingCartBubble } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

library.add([faShoppingBasket]);

function ShoppingCart(props) {
  let length = props.length;
  let onClick = props.onClick;

  return (
    <span>
      <ButtonStyled onClick={onClick} aria-label="Carrito de Compras">
        <FontAwesomeIcon icon="shopping-basket" color="#f74342" />

        {length > 0 && (
          <ShoppingCartBubble>{length > 9 ? "+9" : length}</ShoppingCartBubble>
        )}
      </ButtonStyled>
    </span>
  );
}

ShoppingCart.propTypes = {
  length: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  mobile: PropTypes.bool,
};

export default ShoppingCart;
