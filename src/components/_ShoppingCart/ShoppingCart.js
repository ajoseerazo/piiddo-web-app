import React, { PureComponent } from 'react'
import { Button } from 'reactstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import Link from 'next/link'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

library.add([faChevronDown, faChevronUp])

import './ShoppingCart.scss'

class ShoppingCart extends PureComponent {
  state = {
    minimize: false,
    scroll: false
  }

  toggleMinimize = () => {
    this.setState((prevState) => {
      return {
        minimize: !prevState.minimize
      }
    })
  }

  componentDidUpdate () {
    // if (this.state.scroll) {
    //   this.refs.scrollbars.scrollToBottom()
    // }
  }

  render () {
    let amount = this.props.amount
    let envio = 10000
    let hiddenClassName = false ? 'ShoppingBoxContainer ' : 'ShoppingBoxContainer active'
    let active = false
    hiddenClassName += this.state.minimize ? ' minimizeShoppingBox' : ' '

    return (
      <div className={hiddenClassName}>
         <FontAwesomeIcon
            className='shopping-BigClose' 
            icon="chevron-down"
            onClick={this.toggleMinimize} />
         <FontAwesomeIcon 
            className='shopping-BigCloseUp' 
            icon='chevron-up'
            onClick={this.toggleMinimize}
         />
         <div className='containerArticles'>
          <div className='itemsShoppingContainer'>  
            <div className='boxShoppingTextUp' onClick={this.toggleMinimize}>
              Tu orden
            </div> 
            <Scrollbars 
             autoHeight
             autoHeightMax={'100%'}
             autoHeightMin={0}
             hideTracksWhenNotNeeded
             autoHide
             ref="scrollbars"
             style={{
               overflow: 'hidden'
             }}>
            <div className='articles-shoppingBox'>
                {this.props.children}
            </div>
            </Scrollbars>
          </div>
        <div className='shopping-details'>
          <div className='shopping-amount'> 
            Subtotal
            <span className='shopping-amount-right'> 
            {`$ ${new Intl.NumberFormat('es').format(amount)}`}
            </span>
          </div>
          <div className='shopping-amount'> 
            Envio
            <span className='shopping-amount-right'>$ {new Intl.NumberFormat('es').format(envio)}</span>
          </div>
          <Link to="/checkout">
            <Button block color="primary">
              Pagar 
              <span> $ {new Intl.NumberFormat('es').format(amount+envio)} </span>
            </Button>
          </Link>
        </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart
