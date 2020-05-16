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
import { faSearch, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import CurrencySelector from "../CurrencySelector";
import FontAwesome from "react-fontawesome";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import appActions from "../../redux/actions/app";
import Link from "next/link";

const { selectCurrency } = appActions;

library.add([faSearch, faShoppingBasket]);

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

  render() {
    const { hideShoppingCart } = this.props;

    return (
      <Navbar
        light
        expand="md"
        fixed="top"
        style={{
          backgroundColor: "#FFF",
        }}
      >
        <Link href="/" as="/">
          <NavbarBrand style={{ fontWeight: 300, color: "#FFF" }}>
            <img
              src="https://piiddo.com/piddo-color.png"
              style={{
                width: 104,
              }}
            />
          </NavbarBrand>
        </Link>

        <Col md="5">
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
  const { cop_rate } = state.App.toJS();

  return {
    rate: cop_rate,
    currency_code: "COP",
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ selectCurrency }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);
