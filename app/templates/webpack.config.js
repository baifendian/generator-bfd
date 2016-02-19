var webpack = require('webpack')
var path = require('path')

var isProduction = process.env.NODE_ENV === 'production'

var devServerPort = 9000

var config = {
  entry: {
    app: path.join(__dirname, 'app.jsx')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]' + (isProduction ? '.[hash]' : '') + '.js',
    chunkFilename: '[id]' + (isProduction ? '.[hash]' : '') + '.js',
    publicPath: (isProduction ? '' : '//localhost:' + devServerPort) + '/build/'
  },
  module: {
    noParse: [],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      loader: 'file-loader?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },
  resolve: {
    alias: {}
  },
  devServer: {
    port: devServerPort
  },
  plugins: []
}

var deps = [
  'react/dist/react.min.js',
  'react-dom/dist/react-dom.min.js'
]

if (isProduction) {
  deps.forEach(function (dep) {
    var depPath = path.join(__dirname , 'node_modules', dep)
    config.resolve.alias[dep.split('/')[0]] = depPath
    config.module.noParse.push(depPath)
  })
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config