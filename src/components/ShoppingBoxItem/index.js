import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
  LinkButtonStyled,
  Additionals,
  ProductItemRight,
  ProductItemLeft,
  ShoppingItem,
  ItemImage,
  ProductInfoWrapper,
  ShoppingItemTitle,
  ShoppingItemDescription,
  ShoppingItemAmount,
} from "./styled";
import ProductCounterTiny from "../ProductCounterTiny";

library.add([faChevronUp, faChevronDown]);

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
    disableCounters,
    variations,
  } = props;
  let amout = price;

  const variationsArr = [];
  if (variations) {
    for (let key in variations) {
      variationsArr.push({
        name: `${key}: ${variations[key].name}`,
      });
    }
  }

  const additionals = [
    ...variationsArr,
    ...(options || []),
    ...(extras || []),
    ...(companions || []),
  ];

  const toggle = () => setCollapse(!collapse);

  return (
    <ShoppingItem>
      <ProductItemLeft>
        {image && <ItemImage src={image} />}
        <ProductInfoWrapper>
          <ShoppingItemTitle>{name}</ShoppingItemTitle>
          <ShoppingItemDescription>
            <div>{description}</div>
          </ShoppingItemDescription>
          {additionals.length !== 0 && (
            <div>
              <Collapse isOpen={collapse}>
                <Additionals>
                  {additionals.map((additional, index) => {
                    return (
                      <li key={`${additional.name}-${index}`}>
                        {additional.name}
                      </li>
                    );
                  })}
                </Additionals>
              </Collapse>
              <LinkButtonStyled onClick={toggle}>
                <span>{collapse ? "Ocultar" : "Opciones"}</span>
                <FontAwesomeIcon
                  icon={collapse ? "chevron-up" : "chevron-down"}
                />
              </LinkButtonStyled>
            </div>
          )}
        </ProductInfoWrapper>
      </ProductItemLeft>

      <ProductItemRight>
        {!disableCounters && (
          <ProductCounterTiny
            amount={length}
            onChangeCount={onChangeCount}
            onClickDelete={onClickDelete}
          />
        )}
        <ShoppingItemAmount>
          {`$ ${parseFloat(amout).toFixed(2)}`}
        </ShoppingItemAmount>
      </ProductItemRight>
    </ShoppingItem>
  );
}

export default ShoppingBoxItem;
