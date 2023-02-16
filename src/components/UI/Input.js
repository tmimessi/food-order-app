import React from 'react'
import classes from './Input.module.css'

// forwardRef allows to get access to the input through refs
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* ...props.input ensures that all the key value pairs in this input object which is received on props input are added as props to input */}
      <input ref={ref} {...props.input} />
    </div>
  )
})

export default Input
