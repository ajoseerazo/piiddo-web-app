import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as actions from '../actions/shopping'

import ShoppingBoxItem from "../components/ShoppingBoxItem";

class ShoppingBoxItemContainer extends Component {
  handleUp = (e) => {
    this.props.actions.setAmount(
      this.props.id,
      this.props.slugId,
      this.props.added,
      1
    );
  };

  handleDown = (e) => {
    if (this.props.length - 1 >= 0) {
      this.props.actions.setAmount(
        this.props.id,
        this.props.slugId,
        this.props.added,
        -1
      );
    }
  };

  render() {
    let {
      name,
      description,
      price,
      length,
      image,
      slug,
      id,
      added,
    } = this.props;

    return (
      <ShoppingBoxItem
        name={name}
        description={description}
        price={price}
        length={length}
        image={image}
        id={id}
        added={added}
        handleDown={this.handleDown}
        handleUp={this.handleUp}
      />
    );
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(ShoppingBoxItemContainer);
