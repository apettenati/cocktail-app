import express from 'express'
export const IndexRouter = express.Router()

IndexRouter.get('/', (_, res) => {
  res.send('TODO get index route')
})