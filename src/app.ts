import express from 'express'
import cors from 'cors'

// Establish app
const app = express()
const port = 3000

// Establish middleware
app.use(cors())
app.use(express.json())

// Establish mongodb connection
import 'dotenv/config'
// FIXME URI not working
const uri = process.env['ATLAS_URI']
import mongoose from 'mongoose'
mongoose.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('MongoDB database connection established successfully'))

// Establish Routers
import { IndexRouter } from './routes/index'
import { IngredientsRouter } from './routes/ingredients'
app.use('/', IndexRouter)
app.use('/ingredients', IngredientsRouter)

app.listen(port, () => { console.log(`Server running on port ${port}`) })
