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
passport.use(new Strategy((username: UserInterface["user"]["username"], password: UserInterface["user"]["password"], done) => {
  console.log({ username, password })


  User.findOne({ "user.username": username }, (error: Error, user: UserInterface) => {
    if (error) {
      console.error({ error })
      throw error
    }
    console.log({ user, username, password })
    if (!user) return done(null, false, { message: 'could not find user' })
    console.log('test')
    console.log({ user, username, password })
    bcrypt.compare(password, user.user.password, (error, result) => {
      if (error) throw error
      if (result) {
        return done(null, user)
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
app.use('/', IndexRouter)
app.use('/ingredients', IngredientsRouter)

app.post('/login', passport.authenticate('local'), (_, res) => {
  res.json({ 'message': 'Successfully authenticated' })
})

app.post('/register', async (req, res) => {
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

app.get('/user/', (req, res) => {
  res.json(req.user)
})

app.listen(port, () => { console.log(`Server running on port ${port}`) })