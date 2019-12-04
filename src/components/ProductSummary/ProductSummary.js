import React, { Component } from 'react'
import AddProductButton from '../AddProductButton/AddProductButton'
import Link from "next/link"

import './ProductSummary.scss'

export default class ProductSummary extends Component {
  constructor (props) {
    super(props)

    this.wrapper = React.createRef()
  }

  render() {
    let { product, onAdd } = this.props

    return (
      <Link href={`/products/${product.id}`}>
        <div className="product-summary" ref={this.wrapper}>
          <div className="product-name" style={{
            width: this.wrapper.current ? this.wrapper.current.clientWidth : 0
          }}>
            {product.name}
          </div>
          
          <div className="product-img">
            <img src={product.images[0]} />
          </div>

          <div className="product-info">
            <div className="product-price">
              { `${new Intl.NumberFormat('es').format(product.price)} COP` }
            </div>

            <div className="product-description">
              {product.description}
            </div>
          </div>

          <div className="add-product-button-wrapper">
            <AddProductButton onClick={() => {
              onAdd(product)
            }}>
              Comprar
            </AddProductButton>
          </div>
        </div>
      </Link>
    )
  }
}