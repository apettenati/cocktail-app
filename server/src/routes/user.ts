import passport from 'passport'
import Router from 'express'
import { User } from '../models/user'
import bcrypt from 'bcryptjs'

export const UserRouter = Router()

UserRouter.post('/login', passport.authenticate('local'), (_, res) => {
  res.json({ 'message': 'Successfully authenticated' })
})

UserRouter.post('/register', async (req, res) => {
  // Check to see if user already exists
  User.findOne({ 'user.username': req.body.username })
    .then(async (user) => {
      if (user) { res.json({ 'error': 'User already exists' }) }
      else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log({ hashedPassword })
        const newUser = new User({
          'user': {
            'username': req.body.username,
            'password': hashedPassword
          },
          'ingredients': []
        })

        newUser.save()
          .then(() => { res.json({ 'message': 'User created successfully' }) })
          .catch((error) => {
            console.log({ error })
            res.status(500).json({ 'error': 'Server has experienced an error' })
          })
      }
    })
    .catch((error) => {
      console.log({ error })
      res.status(500).json({ 'error': 'Server has experienced an error' })
    })
})