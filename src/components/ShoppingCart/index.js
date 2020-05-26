import React from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import { ButtonStyled } from "./styled";

import "./styles.scss";

function ShoppingCart(props) {
  let length = props.length;
  let mobClassName = props.mobile ? "mobShopping-basket" : "";
  let onClick = props.onClick;

  return (
    <span className={mobClassName}>
      <ButtonStyled onClick={onClick}>
        <FontAwesome name="shopping-basket" className="basket" color="#f74342" />
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
