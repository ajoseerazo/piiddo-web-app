import React, { Component } from 'react'
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import Link from "next/link"

import './Header.scss'

export default class Header extends Component {
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

  render() {
    return (
      <Navbar light expand="md" fixed="top" className="lp-header" style={{
        backgroundColor: "#F74342"
      }}>
        <Link href="/">
          <NavbarBrand href="/" style={{fontFamily: 'Poppins', fontWeight: 100, color: '#FFF'}}>Piiddo</NavbarBrand>
        </Link>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="btn btn-primary" onClick={() => {
              this.props.onClick()
              gtag('event', 'click', {
                'event_category' : 'Signup',
                'event_action' : 'Click',
                'event_label' : 'click_header'
              });
            }}>
              <div style={{color: 'white', textTransform: 'uppercase'}}>Registrarme</div>
            </NavItem>
            <NavItem className="btn btn-outlined" style={{marginLeft: 20}} onClick={() => {
              this.props.onClick()
              gtag('event', 'click', {
                'event_category' : 'Signin',
                'event_action' : 'Click',
                'event_label' : 'click_header'
              });
            }}>
              <div style={{color: 'black', textTransform: 'uppercase'}}>Ingresar</div>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}