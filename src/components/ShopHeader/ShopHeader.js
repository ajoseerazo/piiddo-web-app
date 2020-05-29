import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  Input,
  InputGroupAddon,
  Col,
  NavbarToggler,
} from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingBasket,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import appActions from "../../redux/actions/app";
import Link from "next/link";
import AddressSelector from "../../containers/AddressSelector";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BackButtonWrapper } from "./styled";
import Router from "next/router";

const { selectCurrency } = appActions;

library.add([faSearch, faShoppingBasket, faChevronLeft, faBars]);

import "./ShopHeader.scss";
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
      <Navbar
        light
        expand="md"
        fixed="top"
        style={{
          backgroundColor: "#FFF",
          borderBottom: bordered ? "1px solid #e5edef" : undefined,
        }}
      >
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

        <Col md="5" className="hide-mobile">
          <InputGroup>
            <Input
              className="search-input"
              placeholder="¿Qué quieres pedir hoy?"
            />
            <InputGroupAddon className="search-button" addonType="append">
              <span className="input-group-text">
                <FontAwesomeIcon icon="search" />
              </span>
            </InputGroupAddon>
          </InputGroup>
        </Col>

        <Nav className="ml-auto" navbar>
          <NavItem className="address-selector-wrapper">
            <AddressSelector address={address} disabled={disableAddress} />
          </NavItem>

          <NavItem style={{ marginRight: 15 }}>
            {!hideShoppingCart && <ShoppingCart />}
          </NavItem>

          <NavItem style={{ marginRight: 10 }}>
            <NavLink className="ingresar-link" href="/ingresar">
              Ingresar
            </NavLink>
          </NavItem>
          {/*<NavItem style={{marginRight: 10}}>
            <NavLink className="cart-icon" href="/cart"><FontAwesomeIcon icon="shopping-basket" /></NavLink>
    </NavItem>*/}
          {/*<NavItem>
            <CurrencySelector onChangeCurrency={this.changeCurrency} />
          </NavItem>*/}
        </Nav>
      </Navbar>
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
