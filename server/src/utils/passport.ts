import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { User, UserInterface } from '../models/user'
import logger from './logger'

// passport.use(new Strategy((
//   username: UserInterface["user"]["username"],
//   password: UserInterface["user"]["password"],
//   done
// ) => {
//   User.findOne({ "user.username": username }, (error: Error, user: UserInterface) => {
//     if (error) { throw error }

//     if (!user) return done(null, false, { message: 'Could not find user' })

//     bcrypt.compare(password, user.user.password, (error, result) => {
//       if (error) throw error
//       if (result) {
//         return done(null, user.user.username)
//       } else {
//         return done(null, false)
//       }
//     })
//   })
// }))


const strategy = new Strategy((username, password, done) => {
  User.findOne({ "user.username": username })
    .then(async (user) => {
      if (!user) return done(null, false, { message: 'Could not find user' })

      try {
        const result = await bcrypt.compare(password, user.user.password)
        if (result) {
          return done(null, user.user.username)
        }
        else { return done(null, false) }

      } catch (error) { logger.error({ error }) }
    })
    .catch((error) => { logger.error({ error }) })
})

passport.use(strategy)

passport.serializeUser((user, done) => done(null, user))

// passport.deserializeUser((username: UserInterface["user"]["username"], done) => {
//   User.findOne({ 'user.username': username }, (error: Error, user: UserInterface) => {
//     done(error, user.user.username)
//   })
// })

passport.deserializeUser(async (username: UserInterface["user"]["username"], done) => {
  try {
    const user = await User.findOne({ 'user.username': username })
    done(null, user!.user.username)
  } catch (error) { logger.error({ error }) }
})