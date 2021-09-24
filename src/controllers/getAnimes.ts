import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { parse } from 'node-html-parser'
import getMainPage from './getMainPage'

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

  const html = getMainPage()

  const animesP = animes.map(anime => 
    parse(`
      <li><a href="${anime.href}" target="_blank">
        ${anime.title} - ${anime.episode}
      </a></li>
    `))

  animesP.forEach(anime => html.querySelector('ul').appendChild(anime))

  return html
}

export default getAnimes
