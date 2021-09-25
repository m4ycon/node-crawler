import puppeteer from 'puppeteer'
import { parse } from 'node-html-parser'

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

  const animesLi = animes.map(anime => 
    parse(`
      <li><a href="${anime.href}" target="_blank">
        ${anime.title} - ${anime.episode}
      </a></li>
    `))

  return animesLi
}

export default getAnimes
