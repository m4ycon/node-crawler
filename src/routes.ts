import express from 'express'
import getPage from './controllers/getAnimes'

const routes = express.Router()

routes.get('/', async (req, res) => {
  const html = await getPage()
  res.send(html)
})

export default routes
