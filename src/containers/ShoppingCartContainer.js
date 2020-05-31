import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "../redux/actions/shoppingCart";

import ShoppingCart from "../components/ShoppingCart";
import ShoppingBoxList from "../components/ShoppingBoxList";
import ShoppingCartDetails from "../components/ShoppingCartDetails";
import { calculatePriceFromPoints } from "../utils";

const { removeFromCart, changeCount } = actions;

class ShoppingCartContainer extends Component {
  handleOpen = (event) => {
    this.refs.ShoppingCartDetails.openAction();
  };

  handleRemoveSlug = (slugId) => {
    this.props.actions.removeSlug(slugId);
  };

  handleAmount = (itemId, slugId, addeds, amount) => {
    this.props.actions.setAmount(itemId, slugId, addeds, amount);
  };

  onChangeOrderCount = (index, storeId, count) => {
    const {
      actions: { changeCount },
    } = this.props;

    changeCount(index, storeId, count);
  };

  deleteFromCart = (storeId, index) => {
    const {
      actions: { removeFromCart },
    } = this.props;

    removeFromCart(storeId, index);
  };

  render() {
    let mobile = this.props.mobile;

    const { items, length, total, deliveryTotal, stores } = this.props;

    return (
      <>
        <ShoppingCart
          mobile={mobile}
          length={length}
          onClick={this.handleOpen}
        />

        <ShoppingCartDetails
          id={this.props.id}
          length={length}
          ref="ShoppingCartDetails"
          deliveryTotal={deliveryTotal}
          amount={total}
        >
          {Object.keys(stores).map((storeId) => {
            return (stores[storeId].items || []).map((item, index) => {
              return (
                <ShoppingBoxList
                  key={`${storeId}-${index}`}
                  order={item}
                  forceActive={true}
                  onClickDelete={this.deleteFromCart.bind(this, storeId, index)}
                  onChangeCount={this.onChangeOrderCount.bind(
                    this,
                    storeId,
                    index
                  )}
                />
              );
            });
          })}
        </ShoppingCartDetails>
      </>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    actions: bindActionCreators({ removeFromCart, changeCount }, dispatch),
  };
}

function mapStateToProps(state, props) {
  const { stores } = state.ShoppingCart;
  const { deliveryLocation } = state.Location;

  let length = 0;
  // let items = [];
  let total = 0;
  let deliveryTotal = 0;
  for (let key in stores) {
    length =
      length +
      stores[key].items.reduce((a, b) => {
        return a + b.count;
      }, 0);

    total =
      total +
      stores[key].items.reduce((a, b) => {
        return a + b.totalAmount;
      }, 0);

    // items = items.concat(...stores[key].items);

    if (deliveryLocation && deliveryLocation.lat && deliveryLocation.lng) {
      deliveryTotal =
        deliveryTotal +
        calculatePriceFromPoints(deliveryLocation, stores[key].location);
    }
  }

  return {
    // items,
    stores,
    length,
    total,
    deliveryTotal,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartContainer);
