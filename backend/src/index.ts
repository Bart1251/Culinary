import express from 'express'
import { sequlize } from './dbconfig'

const app = express()
const port = 6969

app.get('/', (req, res) => {
  res.send('Hello World!')
})

sequlize.sync({alter: true, force: false}).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})