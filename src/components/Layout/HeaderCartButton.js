import React from 'react'
import classes from './HeaderCardButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartConext from '../../store/cart-context'

const HeaderCardButton = props => {
  // using useState to re-evaluate and re-render this component when the animation class is added conditionally
  const [btnIsHighlighted, setButtonIsHighlighted] = useState(false)

  // by using context here, this component will be re-evaluated by React whenever the context changes, and it does in the CartProvider component
  const cartCtx = useContext(CartConext)

  const { items } = cartCtx

  // reduce is a method that allows to transform an array of data into a single value; it receives two arguments: the 1st one is a function that also receives two arguments, and the second one is a starting value (0)
  const numberOfCartItems = items.reduce((currNumer, item) => {
    // returning this because the cart items objects will have an amount field which stores the number of items per item type; so it will reduce this array to a single number
    return currNumer + item.amount
  }, 0)

  // adding animation to the button conditionally when the cart updates
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    // this should only execute if there is at least one item in the cart
    setButtonIsHighlighted(true)

    // after the duration of the animation, which is 300ms, I trigger a function where I set btnIsHighlighted back to false, so everytime I add a new itme to the cart, the button bumps
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false)
    }, 300)

    // returning a cleanup function
    return () => {
      clearTimeout(timer)
    }

    // only items array is a dependency for this effect function, not all the context
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      {/* use context here to update the appropriate amount of cart items */}
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCardButton
