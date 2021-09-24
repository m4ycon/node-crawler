import puppeteer from 'puppeteer'


const getPage = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://animesonline.org/episodio/')
  const html = await page.$$eval('article.item.se.episodes div.data', divs => {
    return divs.map(div => {
      return {
        title: div.querySelector('span.serie')?.innerHTML,
        episode: div.querySelector('h3 a')?.innerHTML,
      }
    })
  })

  
  await browser.close()
  return html
}

export default getPage
