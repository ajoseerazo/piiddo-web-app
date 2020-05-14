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

    /*gtag('event', 'click', {
      'event_category' : 'Shopping Cart',
      'event_action' : 'Click',
      'event_label' : 'open_shopping_cart'
    });*/
  };

  handleRemoveSlug = (slugId) => {
    this.props.actions.removeSlug(slugId);
  };

  handleAmount = (itemId, slugId, addeds, amount) => {
    this.props.actions.setAmount(itemId, slugId, addeds, amount);
  };

  render() {
    let length = this.props.length;
    let amount = this.props.amount;
    let mobile = this.props.mobile;
    let slugs = this.props.slugs;

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
          amount={amount}
        >
          {slugs.map((slug, index) => {
            return (
              <ShoppingBoxList
                slugId={slug.slugId}
                key={slug.slugId + index}
                slugName={slug.name}
                items={slug.items}
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
 //  let { BOX: storeSlugs } = state.shopping.toJS();
  let slugs = [];
  let amount = 0;
  let length = 0;

  /*storeSlugs.mapKeys(slugId => {
    let items = [];

    storeSlugs.get(slugId).mapKeys((itemKey, quantity) => {
      let itemId = getId(itemKey);
      let item = state.getIn(["data", "entities", "items", itemId]).toJS();
      let itemAdded = getAddeds(item, itemKey);

      item.length = quantity;
      item.added = itemAdded;
      itemAdded.forEach(element => {
        item.price += element.price;
      });

      length += quantity;
      amount += quantity * item.price;
      item.image = null;

      items.push(item);
    });

    slugs.push({
      items,
      name: state.getIn(["data", "entities", "places", slugId, "name"]),
      slugId
    });
  });*/

  return {
    slugs,
    amount,
    length,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartContainer);
