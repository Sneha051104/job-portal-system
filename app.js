const express = require('express')
const app = express()
const port = 3000
const web  = require('./routes/web')








//route load
app.use('/',web)

//server star
app.listen(port, () => {
  console.log(`server start localhost:${port}`)
})
