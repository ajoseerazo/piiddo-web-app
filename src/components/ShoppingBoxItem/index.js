import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { LinkButtonStyled, Additionals, ProductItemRight, ProductItemLeft } from "./styled";
import ProductCounterTiny from "../ProductCounterTiny";

library.add([faChevronUp, faChevronDown]);

import "./styles.scss";

function ShoppingBoxItem(props) {
  const [collapse, setCollapse] = useState(false);

  let {
    name,
    description,
    price,
    length = 1,
    image,
    options,
    extras,
    companions,
    onClickDelete,
    onChangeCount,
  } = props;
  let amout = price;

  let activeName = "";

  const additionals = [
    ...(options || []),
    ...(extras || []),
    ...(companions || []),
  ];

  const toggle = () => setCollapse(!collapse);

  return (
    <div className="shoppingItems mount">
      <ProductItemLeft>
        {image && <img className="gallery-img" src={image} />}
        <div className="shoppingItems-box">
          <div className="shoppingItems-title">{name}</div>
          <div className="shoppingItems-extra">
            <div className="shoppingItems-des">{description + activeName}</div>
          </div>
          {additionals.length !== 0 && (
            <div>
              <Collapse isOpen={collapse}>
                <Additionals>
                  {additionals.map((additional) => {
                    return <li>{additional.name}</li>;
                  })}
                </Additionals>
              </Collapse>
              <LinkButtonStyled onClick={toggle}>
                <span>{collapse ? "Ocultar" : "Adicionales"}</span>
                <FontAwesomeIcon
                  icon={collapse ? "chevron-up" : "chevron-down"}
                />
              </LinkButtonStyled>
            </div>
          )}
        </div>
      </ProductItemLeft>

      <ProductItemRight>
        <ProductCounterTiny
          amount={length}
          onChangeCount={onChangeCount}
          onClickDelete={onClickDelete}
        />
        <div className="shoppingItems-amount">
          {`$ ${parseFloat(amout).toFixed(2)}`}
        </div>
      </ProductItemRight>
    </div>
  );
}

export default ShoppingBoxItem;
