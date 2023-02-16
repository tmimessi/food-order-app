import React, { useState } from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

// this is where the cart is rendered, therefore it's where the visibility of the cart should be managed

function App() {
  // useState will be used to handle when the modal cart should show up and when it should be removed if the backdrop or the close button are clicked
  const [cartIsShown, setCartIsShown] = useState(false)

  // passing down a pointer at this showCartHandler button to HeaderCartButton
  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    // all of these components will need access to the cart, therefore the CartProvider context will be need in all of them
    <CartProvider>
      {/* if cartIsShown is thuthy, render the component, and if it's not, don't */}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* onShowCart is a props that holds functions and the convention is that it should start with onSomething */}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
