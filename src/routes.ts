import express from 'express'
import getAnimes from './controllers/getAnimes'
import getFavorites from './controllers/getFavorites'
import getMainPage from './controllers/getMainPage'
import getMovies from './controllers/getMovies'

const routes = express.Router()

routes.get('/', async (req, res) => {
  const moviesLi = await getMovies()
  const animesLi = await getAnimes()

  const html = getMainPage()
  moviesLi.forEach(movie => html.querySelector('#movies').appendChild(movie))
  animesLi.forEach(anime => html.querySelector('#animes').appendChild(anime))

  res.send(html.toString())
})

export default routes
