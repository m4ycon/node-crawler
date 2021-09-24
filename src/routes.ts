import express from 'express'
import path from 'path'
import getAnimes from './controllers/getAnimes'

const routes = express.Router()

routes.get('/', async (req, res) => {
  const html = await getAnimes()
  res.send(html.toString())
})

export default routes
