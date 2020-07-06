import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Col } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import appActions from "../../redux/actions/app";
import Link from "next/link";
import AddressSelector from "../../containers/AddressSelector";
import CitySelector from "../../components/CitySelector";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  BackButtonWrapper,
  NavbarStyled,
  SigninLinkStyled,
  SearchWrapper,
} from "./styled";
import Router from "next/router";
import HeaderSearchBox from "../HeaderSearchBox";

const { selectCurrency } = appActions;

library.add([faShoppingBasket, faChevronLeft, faBars]);

import ShoppingCart from "../../containers/ShoppingCartContainer";

class ShopHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  changeCurrency = (currency) => {
    const {
      actions: { selectCurrency },
    } = this.props;

    selectCurrency(currency);
  };

  goBack = () => {
    Router.back();
  };

  render() {
    const {
      hideShoppingCart,
      address,
      bordered,
      hideBackButton,
      onClickAddressSelector,
      disableAddress,
    } = this.props;

    return (
      <NavbarStyled light expand="md" fixed="top" bordered={bordered}>
        <BackButtonWrapper onClick={hideBackButton ? null : this.goBack}>
          <FontAwesomeIcon
            icon={hideBackButton ? "bars" : "chevron-left"}
            color="#f74342"
          />
        </BackButtonWrapper>

        <Link href="/" as="/">
          <NavbarBrand style={{ fontWeight: 300, color: "#FFF" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/piddo-color.png?alt=media&token=22e13946-57a0-490d-8b2b-42282273e88a"
              style={{
                width: 104,
              }}
              alt="Piiddo-Logo"
            />
          </NavbarBrand>
        </Link>

        <SearchWrapper md="5">
          <HeaderSearchBox />
        </SearchWrapper>

        <Nav className="ml-auto" navbar>
          {/*<NavItem className="address-selector-wrapper">
            <CitySelector address={address} disabled={disableAddress} />
            </NavItem>*/}

          <NavItem className="address-selector-wrapper">
            <AddressSelector address={address} disabled={disableAddress} />
          </NavItem>

          <NavItem style={{ marginRight: 15 }}>
            {!hideShoppingCart && <ShoppingCart />}
          </NavItem>

          <NavItem style={{ marginRight: 10 }}>
            <SigninLinkStyled href="/ingresar">Ingresar</SigninLinkStyled>
          </NavItem>
          {/*<NavItem style={{marginRight: 10}}>
            <NavLink className="cart-icon" href="/cart"><FontAwesomeIcon icon="shopping-basket" /></NavLink>
    </NavItem>*/}
          {/*<NavItem>
            <CurrencySelector onChangeCurrency={this.changeCurrency} />
          </NavItem>*/}
        </Nav>
      </NavbarStyled>
    );
  }
}

function mapStateToProps(state, props) {
  const { cop_rate } = state.App;

  return {
    rate: cop_rate,
    currency_code: "COP",
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ selectCurrency }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);
