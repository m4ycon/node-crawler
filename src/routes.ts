import express from 'express'

import { getLinkAnime, getMainPageAnimes } from './controllers/getAnimes'
import { getMainPageMovies } from './controllers/getMovies'
import getPage from './utils/getPage'

const routes = express.Router()

routes.get('/', async (req, res) => {
  const moviesLi = await getMainPageMovies()
  const animesLi = await getMainPageAnimes()

  const html = getPage('Home')
  moviesLi.forEach(movie => html.querySelector('#movies').appendChild(movie))
  animesLi.forEach(anime => html.querySelector('#animes').appendChild(anime))

  res.send(html.toString())
})

routes.get('/animes/:url', async (req, res) => {
  const { url } = req.params
  const link = await getLinkAnime(url)

  res.redirect(link)
})

export default routes
