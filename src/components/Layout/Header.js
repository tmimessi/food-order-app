import React, { Fragment } from 'react'
import mealsImage from '../../assets/meals.jpeg'
import classes from './Header.module.css'
import HeaderCardButton from './HeaderCartButton'

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        {/* onShowCart is coming from App.js and receive onShowCart={showCartHandler} */}
        <HeaderCardButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt=''/>
      </div>
    </Fragment>
  )
}

export default Header
