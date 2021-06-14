import { Router } from 'express'
import { User } from '../models/user'

export const IngredientsRouter = Router()

IngredientsRouter.get('/', async (req, res) => {
    // FIXME: add .exec()?
    // console.log({ req })
    if (req.isAuthenticated()) {
        console.log('authenticated')
        const result = await User.findOne(
            { 'user.username': req.user }
        )
        // returns null if no user if found
        if (result) {
            console.log({ result })
            res.json(result)
        } else {
            res.status(400).json({ error: 'User not found' })
        }
    }
    else {
        res.status(401).json({ 'error': 'Not authenticated' })
    }
})

IngredientsRouter.post('/', async (req, res) => {
    const result = await User.updateOne(
        { 'user.username': req.body.username },
        { 'ingredients': req.body.ingredients }
    )
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