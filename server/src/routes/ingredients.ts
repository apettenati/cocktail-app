import { Router } from 'express'
import { User } from '../models/user'
// import passport from 'passport'

export const IngredientsRouter = Router()

IngredientsRouter.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        const result = await User.findOne({ 'user.username': req.user })
        if (result) { res.status(200).json(result.ingredients) }
    }
    else {
        res.status(401).json({ 'error': 'Not authenticated' })
    }
})

IngredientsRouter.post('/', async (req, res) => {
    const result = await User.updateOne(
        { 'user.username': req.user },
        { 'ingredients': req.body.ingredients }
    )
    // if results.n are 0, nothing was modified
    if (result.n) {
        res.json(result)
    } else {
        res.status(400).json({ error: 'Ingredients not updated' })
    }
})