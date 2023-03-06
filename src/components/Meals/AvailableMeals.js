import { useEffect, useState } from 'react'
import React from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
  // re-rendering the component once the fetching below is done, because that's an asynchronous task which is only started after the component loaded for the first time and therefore initially there will be no data and we wanna update the component once the data is there, so we need to useState and this State will be the meals.
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true) // we'll start with loading data in this component
  const [httpError, setHttpError] = useState() // managing errors

  // fetching data from the web is a side effect
  // fetch returns a promise since sending a HTTP request is an asynchronous task; so, need to add async/await, but the function we pass into useEffect should not return a promise, so we should create a new function, like this:
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-c7ac0-default-rtdb.firebaseio.com/meals.json'
      )

      // checking if it failed when sending the request
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const responseData = await response.json()

      // responseData will return an object - ant that's because we're using firebase - but we need an array, so we need to transform this
      const loadedMeals = []

      // looping through all keys
      for (const key in responseData) {
        // reaching out to loadedMeals and pushing a new object into this initially empty array
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      // passing the array which is populated above and setting isLoading to false because we are done loading the meals
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    // handling an error inside of a promise 
    fetchMeals().catch(error => {
      setIsLoading(false)
      setHttpError(error.message) // setting the httpError to the error we're getting
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
