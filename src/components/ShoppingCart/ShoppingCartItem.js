import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

library.add([faCaretDown, faCaretUp])

import './ShoppingCartItem.scss'

function ShoppingCartItem (props) {
  let { 
    name, 
    description, 
    price, 
    length, 
    image,
    handleUp,
    handleDown,
    added,
  } = props

  let amout = price * length

  let activeName = ''

  /*(added || []).forEach(item => {
    activeName += ' '+item.name
  })*/
  
  return ( 
    <div className='shoppingItems mount'>
      <div className='shoppingItems-action'>
        <FontAwesomeIcon icon='caret-up'
          className='caret-up-icon'
          onClick={handleUp}
        />
        <span>{ length }</span>
        <FontAwesomeIcon 
          icon='caret-down' 
          className='caret-down-icon'
          onClick={handleDown}/>
    </div > 
      { 
        image && 
        <div className='gallery-img' style={{backgroundImage: 'url('+image+')'}}></div>
      }
      <div className='shoppingItems-box'>
        <div className='shoppingItems-title'> 
          { name } 
        </div> 
        <div className='shoppingItems-extra'>
          <div className='shoppingItems-des'> 
            { description + activeName } 
          </div> 
          <div className='shoppingItems-amount'>
            { `$ ${new Intl.NumberFormat('es').format(amout)}` }
          </div>
        </div> 
      </div> 
    </div>
  )
}

export default ShoppingCartItem
