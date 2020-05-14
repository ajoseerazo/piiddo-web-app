import React, { PureComponent } from "react";
// import { removeSlug } from "../../actions/shopping";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";
import ShoppingBoxItem from "../../containers/ShoppingBoxItemContainer";

import "./styles.scss";

class ShoppingBoxList extends PureComponent {
  componentWillMount() {
    this.setState({
      active: this.props.forceActive,
    });
  }

  toggleActive = (event) => {
    this.setState((prevState) => {
      return {
        active: !prevState.active,
      };
    });
  };

  handleTimes = () => {
    // this.props.dispatch(removeSlug(this.props.slugId));
  };

  render() {
    let shoppingItemClassName = this.state.active
      ? "shoppingItem active"
      : "shoppingItem";
    let name = this.props.slugName;
    let slugId = this.props.slugId;

    const {
      order: { product, options, companions, extras, totalAmount, count },
      onClickDelete,
      onChangeCount
    } = this.props;

    return (
      <div className={shoppingItemClassName}>
        <div>
          <ShoppingBoxItem
            name={product.name}
            slugId={slugId}
            description={product.description}
            price={product.usdPrice}
            image={product.image}
            slug={product.slug}
            id={product.id}
            added={product.added}
            options={options}
            companions={companions}
            extras={extras}
            totalAmount={totalAmount}
            count={count}
            onChangeCount={onChangeCount}
            onClickDelete={onClickDelete}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ShoppingBoxList);
