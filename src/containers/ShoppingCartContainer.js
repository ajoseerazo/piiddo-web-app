import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItemKey, getId, getAddeds } from "../utils";
import actions from "../redux/actions/shoppingCart";

import ShoppingCart from "../components/ShoppingCart";
import ShoppingBoxList from "../components/ShoppingBoxList";
import ShoppingCartDetails from "../components/ShoppingCartDetails";

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

  onChangeOrderCount = (index, count) => {
    const {
      actions: { changeCount },
    } = this.props;

    changeCount(index, count);
  };

  deleteFromCart = (index) => {
    const {
      actions: { removeFromCart },
    } = this.props;

    removeFromCart(index);
  };

  render() {
    let mobile = this.props.mobile;

    const { items } = this.props;

    let length = items.reduce((a, b) => {
      return a + b.count;
    }, 0);

    let total = items.reduce((a, b) => {
      return a + b.totalAmount
    }, 0);

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
          deliveryTotal={2}
          amount={total}
        >
          {(items || []).map((item, index) => {
            return (
              <ShoppingBoxList
                key={index}
                order={item}
                forceActive={true}
                onClickDelete={this.deleteFromCart.bind(this, index)}
                onChangeCount={this.onChangeOrderCount.bind(this, index)}
              />
            );
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
  const { items } = state.ShoppingCart.toJS();

  return {
    items,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartContainer);
