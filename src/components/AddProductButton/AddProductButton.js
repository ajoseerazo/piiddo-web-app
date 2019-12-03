import React, { Component } from 'react'
import {
  Button
} from 'reactstrap'

import './AddProductButton.scss'

export default class AddProductButton extends Component {
  render() {
    let props = this.props

    return (
      <Button color="primary" className="add-product-button" onClick={props.onClick}>
        {props.children}
      </Button>
    )
  }
}