import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import helmet from 'helmet'
import passport from 'passport'
// import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import logger from './utils/logger'
import { MONGO_URI, PORT, SECRET } from './utils/database'
import './utils/passport'

// App
export const app = express()

// MongoDB connection
mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB database connection established successfully'))
  .catch((error) => logger.error(`MongoDB connection error: ${error}`))

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(SECRET))
app.use(helmet())

// Session
app.use(session({
  secret: SECRET!,
  resave: false,
  saveUninitialized: true,
  // store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: {
    sameSite: 'lax',
    maxAge: 1000 * 60 * 100
  }
}))

// Passport 
app.use(passport.initialize())
app.use(passport.session())

// Routes
import { IndexRouter } from './routes/index'
import { IngredientsRouter } from './routes/ingredients'
import { UserRouter } from './routes/user'
app.use('/', IndexRouter)
app.use('/ingredients', IngredientsRouter)
app.use('/user', UserRouter)

app.listen(PORT, () => { logger.info(`Server running on port ${PORT}`) })