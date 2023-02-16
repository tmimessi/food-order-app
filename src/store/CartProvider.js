import CartConext from './cart-context'
import { useReducer } from 'react'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // expect to have an amount field on the item and a price field and by multiplying these two, it's possible to know how much the totalAmount needs to change
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    // checking if the item in the array has the same id as the item we're adding with this action which was dispatched and will return the index of that item if it exists
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )

    // this will only work if the item exists
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        // if, for example, sushi was already part of the cart, and two more is added, the amount must be updated
        amount: existingCartItem.amount + action.item.amount
      }
      // creating a new array where the old objects is copied but updating the amount
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      // concat adds a new item to the array although it doesnt edit the existing array, but return a new array when the item is new
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'REMOVE') {
    // if there is more than one of the same dish in the cart and one of them is removed, the price should update but the dish should not be removed from the cart, because there is more; but if theres already only one of the item, if I remove it, the dish should disappear from the cart.

    // getting the index of the item
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    )
    // getting the item itself
    const existingItem = state.items[existingCartItemIndex]
    // updating the amount
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems
    if (existingItem.amount === 1) {
      // making sure all items where the id is not equal to the action id are kept but the one item where the item id is equal to the id of the action, which is the to-be removed id, for that one item, we return false here and then we remove that item from the newly generaterd array, to that gives a new array where this item with this id is  not part anymore
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      // just updating the amount, not removing the dish
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
      // creating a new array with the old items
      updatedItems = [...state.items]
      // overwriting the old item in the array with the updated item which has the updated amount
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState
}

// this component will manage the cart context data and provide that context to all components that want access to it
const CartProvider = props => {
  // the 1st array element is a state snapshot; the 2nd is a function that allows to dispatch an action to the reducer --- and then pointing at the cartReducer and setting an initial state
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = item => {
    // can be any action, but typically its an object which has some property which allows to identify that action inside of the reducer function and also a property to foward the item as part of the action, in this case, fowarding 'item'
    dispatchCartAction({ type: 'ADD', item: item })
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartConext.Provider value={cartContext}>
      {props.children}
    </CartConext.Provider>
  )
}

export default CartProvider
