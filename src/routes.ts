import express from 'express'
import fs from 'fs'
import http from 'http'
import path from 'path'

import { getDownloadLinkAnime, getMainPageAnimes } from './controllers/getAnimes'
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
  const { animeTitle, downloadLink } = await getDownloadLinkAnime(url)

  const file = fs.createWriteStream(
    path.resolve('D:', 'Torrent', `${animeTitle.replace(/[^[A-zÀ-ú0-9-]/gi, '_')}.mp4`)
  )
  const request = http.get(downloadLink, response => {
    response.pipe(file)
  })
    .on('finish', () =>
      res.send(`${animeTitle} baixando...`))
    .on('error', () => 
      res.send(`Erro ao baixar ${animeTitle}`))
})

export default routes
