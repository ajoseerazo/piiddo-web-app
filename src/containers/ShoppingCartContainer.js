import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItemKey, getId, getAddeds } from "../utils";
// import * as actions from "../actions/shopping";

import ShoppingCart from "../components/ShoppingCart";
import ShoppingBoxList from "../components/ShoppingBoxList";
import ShoppingCartDetails from "../components/ShoppingCartDetails";

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

  render() {
    let mobile = this.props.mobile;

    const { items } = this.props;

    let length = items.length;

    return (
      <>
        <ShoppingCart
          mobile={mobile}
          length={length}
          onClick={this.handleOpen}
        />

        <ShoppingCartDetails
          id={this.props.id}
          length={(items || []).length}
          ref="ShoppingCartDetails"
          amount={1000}
        >
          {(items || []).map((item, index) => {
            return (
              <ShoppingBoxList
                key={index}
                product={item.product}
                forceActive={true}
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
    actions: bindActionCreators({}, dispatch),
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
