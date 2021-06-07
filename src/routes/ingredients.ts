import express from 'express'
import { IngredientsModel } from '../models/ingredients'

export const IngredientsRouter = express.Router()

/* In memory */
// let userIngredients: IngredientsInterface = { "ingredients": [] }

IngredientsRouter.get('/', async (req, res) => {
    const username = req.body.username
    const result = await IngredientsModel.findOne({ username })
    // returns null if no user if found
    if (result) {
        res.json(result)
    } else {
        res.status(400).json({ error: 'User not found' })
    }
})

IngredientsRouter.post('/', async (req, res) => {
    const username = req.body.username
    const ingredients = req.body.ingredients
    const result = await IngredientsModel.updateOne({ username }, { ingredients })
    // if results.n are 0, nothing was modified
    if (result.n) {
        res.json(result)
    } else {
        res.status(400).json({ error: 'Ingredients not updated' })
    }
})

/* Instantiate first user */
// IngredientsRouter.post('/', (_, res) => {
//     new IngredientsModel({ "username": "amanda", "ingredients": [] }).save()
//     res.status(200).json('ok')
// })