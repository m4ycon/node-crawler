import puppeteer from 'puppeteer'
import { parse } from 'node-html-parser'
import getFavorites from './getFavorites'

const getMovies = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://comandotorrents.com.br/')
  const movies = await page.$$eval('article header h2.entry-title a', 
    anchors => anchors.map(anchor => ({
      title: anchor.innerHTML,
      href: anchor.attributes.getNamedItem('href')?.value,
    })
  ))
  await browser.close()

  const favorites = getFavorites().map(favorite => favorite.toLowerCase())

  const moviesLi = movies.map(movie => {
    return parse(`
      <li class="${
        favorites.some(favorite => movie.title.toLowerCase().includes(favorite))
          ? "highlight" 
          : ""}">
        <a href="${movie.href}" target="_blank">
          ${movie.title}
        </a>
      </li>
    `)
  })

  return moviesLi
}

export default getMovies
