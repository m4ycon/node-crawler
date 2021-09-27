import path from 'path'
import fs from 'fs'
import { parse } from "node-html-parser"

const getPage = (page: string) => {
  const filepath = path.resolve(__dirname, '..', 'views', page, 'index.html')
  const html = parse(fs.readFileSync(filepath, 'utf8'))

  const cssFilepath = path.resolve(__dirname, '..', 'views', page, 'styles.css')
  const css = '<style>' + fs.readFileSync(cssFilepath, 'utf8').toString() + '</style>'
  html.querySelector('head').appendChild(parse(css))

  return html
}

export default getPage
