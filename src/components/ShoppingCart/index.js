import React from "react";
import PropTypes from "prop-types";
import { ButtonStyled } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

library.add([faShoppingBasket]);

import "./styles.scss";

function ShoppingCart(props) {
  let length = props.length;
  let mobClassName = props.mobile ? "mobShopping-basket" : "";
  let onClick = props.onClick;

  return (
    <span className={mobClassName}>
      <ButtonStyled onClick={onClick} aria-label="Carrito de Compras">
        <FontAwesomeIcon icon="shopping-basket" color="#f74342" />

        {length > 0 && (
          <span className="shoppingCardBubble">
            {length > 9 ? "+9" : length}
          </span>
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
