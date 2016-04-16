var express = require('express')
var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()

app.use(express.static(__dirname))

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/build/',
  stats: {
    colors: true
  }
}))

app.get('/data/:name.json', function(req, res) {
  res.sendFile(path.join(__dirname, 'data/' + req.params.name + '.json'))
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var port = process.argv.slice(2)[0] || 9000

app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port + ', Ctrl+C to stop')
})
