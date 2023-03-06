import React from 'react'

// will update parts of the app 
const CartConext = React.createContext({
  // since cart items will be managed
  items: [],
  totalAmount: 0,
  // two functions to update the context
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {}
})

export default CartConext