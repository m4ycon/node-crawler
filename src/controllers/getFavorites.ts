import path from 'path'
import fs from 'fs'

const getFavorites = () => {
  const favorites = fs.readFileSync(
    path.resolve(__dirname, '..', 'list.txt'), 
    'utf8'
  )
  return favorites.split('\r\n').map(favorite => favorite.trim().toLowerCase())
}

export default getFavorites
