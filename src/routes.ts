import express from 'express'
import { getMainPageAnimes } from './controllers/getAnimes'
import { getMainPageMovies } from './controllers/getMovies'
import getMainPage from './utils/getMainPage'

const routes = express.Router()

routes.get('/', async (req, res) => {
  const moviesLi = await getMainPageMovies()
  const animesLi = await getMainPageAnimes()

  const html = getMainPage()
  moviesLi.forEach(movie => html.querySelector('#movies').appendChild(movie))
  animesLi.forEach(anime => html.querySelector('#animes').appendChild(anime))

  res.send(html.toString())
})

export default routes
