import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = props => {
  // this is calling the onClose on line 24 --- passing a value through multiple levels (could use useContext though)
  return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

// getting access to the div in public/index.html
const portalElement = document.getElementById('overlays')

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {/* this portalElement is passed as a 2nd argument to both Portal calls, where it should go */}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  )
}

export default Modal
