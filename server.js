const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const app = new (require('express'))()
const expressWs = require('express-ws')(app)
const process = require('process')
const child_process = require('child_process')


const { handle } = require('./websocket')
const machineControl = child_process.fork('./machineControl')
process.title = 'Laser-Engrave-Node'


const port = 80

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.ws('/', handle(machineControl))

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
