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
    let items = this.props.items;
    let slugId = this.props.slugId;

    return (
      <div className={shoppingItemClassName}>
        <div className="shoppingItem-title">
          {name}
          <span className="shoppingItem-show" onClick={this.toggleActive} />
          <FontAwesome
            className="shoppingItem-btn"
            name="times"
            onClick={this.handleTimes}
          />
        </div>
        <div>
          {items.map((item, index) => {
            return (
              <ShoppingBoxItem
                key={item.id + index}
                name={item.name}
                slugId={slugId}
                description={item.description}
                price={item.price}
                length={item.length}
                image={item.image}
                slug={item.slug}
                id={item.id}
                added={item.added}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ShoppingBoxList);
