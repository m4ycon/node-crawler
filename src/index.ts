import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()
const port = 7777

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
