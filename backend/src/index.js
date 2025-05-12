import express from 'express'
import cors from 'cors'
import router from './todo.routes.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/todos', router)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
