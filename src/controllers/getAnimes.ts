import puppeteer from 'puppeteer'
import { parse } from 'node-html-parser'
import getFavorites from '../utils/getFavorites'

const getAnimes = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://animesonline.org/episodio/')
  const animes = await page.$$eval('article.item.se.episodes div.data', 
    divs => divs.map(div => ({
      title: div.querySelector('span.serie')?.innerHTML,
      episode: div.querySelector('h3 a')?.innerHTML,
      href: div.querySelector('h3 a')?.attributes.getNamedItem('href')?.value,
    })
  ))
  await browser.close()

  const favorites = getFavorites()

  const animesLi = animes.map(anime => 
    parse(`
      <li class="${
        favorites.some(favorite => anime.title?.toLowerCase().includes(favorite))
          ? "highlight" 
          : ""}">
        <a href="${anime.href}" target="_blank">
          ${anime.title} - ${anime.episode}
        </a>
      </li>
    `))

  return animesLi
}

export default getAnimes
