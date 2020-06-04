import React, { PureComponent } from "react";
// import { removeSlug } from "../../actions/shopping";
import { connect } from "react-redux";
import ShoppingBoxItem from "../../containers/ShoppingBoxItemContainer";
import { ShoppingCartItemWrapper } from "./styled";

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

  render() {
    let name = this.props.slugName;
    let slugId = this.props.slugId;

    const {
      order: { product, options, companions, extras, totalAmount, count, variations },
      onClickDelete,
      onChangeCount,
      disableCounters
    } = this.props;

    return (
      <ShoppingCartItemWrapper>
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
            disableCounters={disableCounters}
            variations={variations}
          />
        </div>
      </ShoppingCartItemWrapper>
    );
  }
}

export default connect(null, null)(ShoppingBoxList);
