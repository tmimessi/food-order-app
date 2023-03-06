import classes from './Checkout.module.css'
import { useRef, useState } from 'react'

// helper functions
const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = props => {
  // useState to give the user some feedback about the error if the form is no valid
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  })

  // useRef to get the values only once the form is submitted
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = event => {
    // we want to submit the form only when the button 'Confirm' is clicked, so we need to set a event.preventDefault on the form.
    event.preventDefault()
    // .current gives access to the actual value stored in the ref (which in this case is the input element).
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    // if the enteredName is not empty, then, enteredNameIsValid and etc.
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    })

    // only if all four constants above have a value of true, the overall form is valid.
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid

    if (!formIsValid) {
      return
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    })
  }

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`

  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please, enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please, enter a valid street.</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please, enter a valid postal code (5 characters long).</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please, enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
