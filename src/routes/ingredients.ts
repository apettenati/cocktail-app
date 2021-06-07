import express from 'express'
import { IngredientsInterface, INGREDIENTS } from '../static/ingredients'

export const IngredientsRouter = express.Router()

let userIngredients: IngredientsInterface = { "ingredients": [] }

IngredientsRouter.get('/', (_, res) => {
    res.json(userIngredients)
})

IngredientsRouter.post('/', (req, res) => {
    const ingredients = req.body.ingredients
    const newUserIngredients = [...new Set([...userIngredients.ingredients, ...ingredients])]
    userIngredients = { "ingredients": newUserIngredients }
    res.json(userIngredients)
})

IngredientsRouter.delete('/', (req, res) => {
    const ingredients = req.body.ingredients
    console.log({ ingredients })
    const filteredIngredients = userIngredients.ingredients.filter((ingredient) => !ingredients.includes(ingredient))
    userIngredients = { "ingredients": filteredIngredients }
    res.send(userIngredients)
})

console.log(INGREDIENTS)