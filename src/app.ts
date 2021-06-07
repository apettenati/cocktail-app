import express from 'express'
import { IndexRouter } from './routes/index'
import { IngredientsRouter } from './routes/ingredients'

const app = express()
const port = 3000

app.use(express.json())

app.use('/', IndexRouter)
app.use('/ingredients', IngredientsRouter)

app.listen(port, () => { console.log(`Server running on port ${port}`) })
