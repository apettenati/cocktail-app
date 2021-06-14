import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import { User, UserInterface } from './models/user'
import { MONGO_URI, PORT } from './utils/config'
import logger from './utils/logger'

// App
export const app = express()

// MongoDB connection
mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB database connection established successfully'))
  .catch((error) => logger.error(`MongoDB connection error: ${error}`))

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGO_URI })
}))
app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())

// Passport 
passport.use(new Strategy((
  username: UserInterface["user"]["username"],
  password: UserInterface["user"]["password"],
  done
) => {
  User.findOne({ "user.username": username }, (error: Error, user: UserInterface) => {
    if (error) { throw error }

    if (!user) return done(null, false, { message: 'Could not find user' })

    bcrypt.compare(password, user.user.password, (error, result) => {
      if (error) throw error
      if (result) {
        return done(null, user.user.username)
      } else {
        return done(null, false)
      }
    })
  })
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((username: UserInterface["user"]["username"], cb) => {
  User.findOne({ 'user.username': username }, (error: Error, user: UserInterface) => {
    cb(error, user.user.username)
  })
})

// Routes
import { IndexRouter } from './routes/index'
import { IngredientsRouter } from './routes/ingredients'
import { UserRouter } from './routes/user'
app.use('/', IndexRouter)
app.use('/ingredients', IngredientsRouter)
app.use('/user', UserRouter)

app.listen(PORT, () => { logger.info(`Server running on port ${PORT}`) })