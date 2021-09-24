import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { parse } from 'node-html-parser'

const getAnimes = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://animesonline.org/episodio/')
  const animes = await page.$$eval('article.item.se.episodes div.data', divs => {
    return divs.map(div => {
      return {
        title: div.querySelector('span.serie')?.innerHTML,
        episode: div.querySelector('h3 a')?.innerHTML,
      }
    })
  })
  await browser.close()

  const filepath = path.resolve(__dirname, '..', 'views', 'index.html')
  const html = parse(fs.readFileSync(filepath, 'utf8'))

  const animesP = animes.map(anime => parse(`<li>${anime.title} - ${anime.episode}</li>`))

  animesP.forEach(anime => html.querySelector('ul').appendChild(anime))

  return html
}

export default getAnimes
