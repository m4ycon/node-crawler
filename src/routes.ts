import express from 'express'
import fs from 'fs'
import path from 'path'
import http from 'http'
import stream from 'stream'
import download from 'download'

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
  const downloadLink = await getLinkAnime(url)
  const filePath = fs.createWriteStream(
    path.resolve('D:', 'Torrent', 'video.mp4')
  )

  // download(downloadLink).pipe(filePath)
  //   .on('close', () => console.log('Download complete'))
  // await download(downloadLink, path.resolve('D:', 'Torrent'))

  // console.log(downloadLink)
  res.redirect(downloadLink)
})

export default routes
