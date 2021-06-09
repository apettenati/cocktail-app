import mongoose from 'mongoose'
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import passport from 'passport'
import { Strategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { User, UserInterface } from './models/user'

// App
const app = express()
const port = 4000

// MongoDB connection
const uri = process.env['ATLAS_URI']
mongoose.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('MongoDB database connection established successfully'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:3000/', credentials: true }))
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true
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
  User.findOne({ username }, (error: Error, user: UserInterface) => {
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

app.listen(port, () => { console.log(`Server running on port ${port}`) })