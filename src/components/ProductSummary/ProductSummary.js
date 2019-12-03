import React, { Component } from 'react'
import AddProductButton from '../AddProductButton/AddProductButton'

import './ProductSummary.scss'

export default class ProductSummary extends Component {
  render() {
    let { product, onAdd } = this.props

    return (
      <div className="product-summary">
        <div className="product-name">
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
            Agregar al carrito
          </AddProductButton>
        </div>
      </div>
    )
  }
}