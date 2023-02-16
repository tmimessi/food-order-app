import React, { useContext } from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartConext from '../../../store/cart-context'

const MealItem = props => {
  const cartCtx = useContext(CartConext)

  const price = `$${props.price.toFixed(2)}`

  // getting the item which was fowarded to the reducer, triggering the context method whenever the form is submitted and adding items to the cart
  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        {/* rendering this meal items for all the meals in the DUMMY_MEALS array */}
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem
