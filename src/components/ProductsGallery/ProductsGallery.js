import React, { Component } from 'react'
import ProductSummary from '../ProductSummary/ProductSummary'

import './ProductsGallery.scss'

export default class ProductsGallery extends Component {
  render() {
    let { products, onAddProduct, onClickProduct } = this.props

    return (
      <div className="products-gallery">
      {
        (products || []).map(product => (
          <div className="product-summary-wrapper" onClick={onClickProduct.bind(this, product)}>
            <ProductSummary product={product} onAdd={onAddProduct}/>
          </div>
        ))
      }
      </div>
    )
  }
}