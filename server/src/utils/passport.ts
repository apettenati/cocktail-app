import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { User, UserInterface } from '../models/user'
import logger from './logger'

const strategy = new Strategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ "user.username": username })
    if (!user) return done(null, false, { message: 'Could not find user' })
    try {
      const result = await bcrypt.compare(password, user.user.password)
      if (result) {
        return done(null, user.user.username)
      }
      else { return done(null, false) }

    } catch (error) { logger.error({ error }) }
  } catch (error) { logger.error({ error }) }
})

passport.use(strategy)

passport.serializeUser((user, done) => {
  console.log('serialize user', { user })
  done(null, user)
})

passport.deserializeUser(async (username: UserInterface["user"]["username"], done) => {
  try {
    const user = await User.findOne({ 'user.username': username })
    done(null, user!.user.username)
  } catch (error) { logger.error({ error }) }
})