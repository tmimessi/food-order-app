import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = props => {
  // this state will control whether this form is valid or not
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault()

    const enteredAmount = amountInputRef.current.value
    // converting the string above to a number
    const enteredAmountNumber = +enteredAmount

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false)
      return 
    }
    // this function is defined on MealItem.js
    props.onAddToCart(enteredAmountNumber)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  )
}

export default MealItemForm
