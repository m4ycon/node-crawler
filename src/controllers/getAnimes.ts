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
  // puppeteer.use(StealthPlugin())
  // puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

  const browser = await puppeteer.launch({
    // headless: false, 
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  })
  const page = await browser.newPage()
  await page.goto(animeUrl)
  const link = await page.$eval(
    '#option-1 iframe', 
    iframe => iframe.attributes.getNamedItem('src')?.value ?? ''
  )
  await page.goto(link)

  const html = await page.content()
  const videoLinks = html.match(/"play_url":"([^"]*)"/)
  const videoLink = videoLinks 
    ? JSON.parse('{' + videoLinks[0] + '}').play_url
    : ''

  await browser.close()
  return videoLink
}

const defaultExport = {
  getMainPageAnimes,
  getDownloadLinkAnime: getLinkAnime,
}

export default defaultExport
