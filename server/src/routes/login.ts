import passport from 'passport'
import Router from 'express'

export const LoginRouter = Router()

LoginRouter.post('/', passport.authenticate('local'), (_, res) => {
  res.json({ 'message': 'Successfully authenticated' })
})
