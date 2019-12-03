import React, { Component } from 'react'

import './Feature.scss'

export default class Feature extends Component {
  render() {
    let { icon, title, description } = this.props
    return (
      <div className="feature">
        <div className="feature-icon">
          {icon}
        </div>

        <h3 className="feature-title">
          {title}
        </h3>

        <p className="feature-description">
          {description}
        </p>
      </div>
    )
  }
}