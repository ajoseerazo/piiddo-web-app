import React, { Component } from 'react'
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
  NavbarToggler
} from 'reactstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import CurrencySelector from '../CurrencySelector'
import FontAwesome from 'react-fontawesome'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import appActions from "../../redux/actions/app"

const {
  selectCurrency
} = appActions

library.add([faSearch, faShoppingBasket])

import './ShopHeader.scss'

class ShopHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  changeCurrency = (currency) => {
    const { actions: { selectCurrency } } = this.props

    selectCurrency(currency);
  }

  render() {
    return (
      <Navbar light expand="md" fixed="top" style={{
        backgroundColor: "#f969b3",
        borderBottom: 'none'
      }}>
        <NavbarBrand href="/" style={{fontFamily: 'Poppins', fontWeight: 700, color: '#FFF'}}>
          <FontAwesome name='gift' />
          <span style={{marginLeft: 8}}>Veket</span>
        </NavbarBrand>

        <Col md="5">
          <InputGroup>
            <Input className="search-input" placeholder="¿Qué quieres regalar?" />
            <InputGroupAddon className="search-button" addonType="append"><span className="input-group-text"><FontAwesomeIcon icon="search" /></span></InputGroupAddon>
          </InputGroup>
        </Col>

        <Nav className="ml-auto" navbar>
          <NavItem style={{marginRight: 10}}>
            <NavLink className="ingresar-link" href="/ingresar">Ingresar</NavLink>
          </NavItem>
          <NavItem style={{marginRight: 10}}>
            <NavLink className="cart-icon" href="/cart"><FontAwesomeIcon icon="shopping-basket" /></NavLink>
          </NavItem>
          <NavItem>
            <CurrencySelector onChangeCurrency={this.changeCurrency} />
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

function mapStateToProps(state, props) {
  const { cop_rate } = state.App.toJS();

  return {
    rate: cop_rate,
    currency_code: "COP"
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ selectCurrency }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);