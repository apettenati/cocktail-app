import passport from 'passport'
import Router from 'express'
import { User } from '../models/user'
import bcrypt from 'bcryptjs'
import 'express-async-errors'
import logger from '../utils/logger'

export const UserRouter = Router()

UserRouter.get('/', (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.status(200).json({ 'message': `Current user is "${req.user}"` })
  } else {
    res.status(200).json({ 'message': `There is no user logged in.` })
  }
})

UserRouter.post('/login', passport.authenticate('local'), (_, res) => {
  res.status(200).json({ 'message': 'Successfully authenticated' })
})

UserRouter.post('/logout', (req, res) => {
  req.logOut()
  res.status(200).json({ 'message': 'Successfully logged out' })
})

UserRouter.post('/register', async (req, res) => {
  console.log('server received register request')
  console.log({ req })
  // Check to see if user already exists
  User.findOne({ 'user.username': req.body.username })
    .then(async (user) => {
      if (user) { res.status(409).json({ 'error': 'User already exists' }) }
      else {
        const username = req.body.username
        const password = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({ 'user': { username, password } })

        newUser.save()
          .then(() => { res.status(200).json({ 'message': 'User created successfully' }) })
          .catch((error) => {
            logger.error({ error })
            res.status(500).json({ 'error': 'Server has experienced an error' })
          })
      }
    })
    .catch((error) => {
      logger.error({ error })
      res.status(500).json({ 'error': 'Server has experienced an error' })
    })
})