import React, { PureComponent } from 'react'
import ShoppingCartItem from './ShoppingCartItem'

import './ShoppingCartList.scss'

export default class ShoppingCartList extends PureComponent {
  componentWillMount () {
    this.setState({
      active: this.props.forceActive
    })  
  }

  toggleActive = (event) => {
    this.setState((prevState) => {
      return {
        active: !prevState.active
      }
    })
  }

  handleTimes = () => {
  }

  render () {
    let shoppingItemClassName = 'shoppingItem active'
    let name = this.props.slugName
    let items = this.props.items
    let slugId = this.props.slugId

    console.log(items)

    return (
      <div className={shoppingItemClassName}> 
        {
        items.map((item,index) => {
            return (
            <ShoppingCartItem 
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                length={item.length}
                image={item.img}
                id={item.id}
                added={item.added}
            />
            )
        })
        }
      </div>
    )
  }
}
