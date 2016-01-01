import path from "path"

import express from "express"
import webpack from "webpack"

import config from "./webpack.config.dev.babel"


const PORT = 3010
const HOST = "localhost"


const app = express()
const compiler = webpack(config)


app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require("webpack-hot-middleware")(compiler))

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(PORT, HOST, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Listening at http://${HOST}:${PORT}`)
})
