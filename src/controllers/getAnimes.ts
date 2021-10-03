import puppeteer from 'puppeteer'
import { parse } from 'node-html-parser'
import getFavorites from '../utils/getFavorites'

export const getMainPageAnimes = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://animesonline.cc/episodio/')
  const animes = await page.$$eval('article.item.se.episodes div.eptitle h3 a', 
    anchors => anchors.map(anchor => ({
      title: anchor.textContent,
      href: 'http://localhost:7777/animes/' 
        + encodeURIComponent(anchor.attributes.getNamedItem('href')?.value ?? ''),
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
          ${anime.title}
        </a>
      </li>
    `))

  return animesLi
}

export const getLinkAnime = async (animeUrl: string) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(animeUrl)
  const link = await page.$eval(
    '#option-1 iframe', 
    iframe => iframe.attributes.getNamedItem('src')?.value ?? ''
  )
  browser.close()      

  return link
}

const defaultExport = {
  getMainPageAnimes,
  getDownloadLinkAnime: getLinkAnime,
}

export default defaultExport
