import React from "react";
import FontAwesome from "react-fontawesome";
import AnimateOnChange from "../../containers/AnimateOnChangeContainer";

import "./styles.scss";

function ShoppingBoxItem(props) {
  let {
    name,
    description,
    price,
    length,
    image,
    handleUp,
    handleDown,
    added,
  } = props;
  let amout = price * length;

  let activeName = "";

  added.forEach((item) => {
    activeName += " " + item.name;
  });

  return (
    <div className="shoppingItems mount">
      <div className="shoppingItems-action">
        <FontAwesome
          name="caret-up"
          className="caret-up-icon"
          onClick={handleUp}
        />
        <AnimateOnChange baseClassName="" animationClassName="boxLengthanim">
          {length}
        </AnimateOnChange>
        <FontAwesome
          name="caret-down"
          className="caret-down-icon"
          onClick={handleDown}
        />
      </div>
      {image && (
        <div
          className="gallery-img"
          style={{ backgroundImage: "url(" + image + ")" }}
        ></div>
      )}
      <div className="shoppingItems-box">
        <div className="shoppingItems-title">{name}</div>
        <div className="shoppingItems-extra">
          <div className="shoppingItems-des">{description + activeName}</div>
          <div className="shoppingItems-amount">
            {`${new Intl.NumberFormat("es").format(amout)} Bs`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBoxItem;