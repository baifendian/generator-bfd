var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var _ = require('underscore')

var option = new Set(process.argv)

var isProduction = option.has('--production')

var devServerPort = 9000

var config = {
  entry: {
    app: path.join(__dirname, 'app.jsx')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]' + (isProduction ? '.[hash]' : '') + '.js',
    chunkFilename: '[id]' + (isProduction ? '.[hash]' : '') + '.js',
    publicPath: '/build/'
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

if (isProduction) {
  var deps = [
    'react/dist/react.min.js',
    'react-dom/dist/react-dom.min.js'
  ]
  deps.forEach(function(dep) {
    var depPath = path.join(__dirname, 'node_modules', dep)
    config.resolve.alias[dep.split('/')[0]] = depPath
    config.module.noParse.push(depPath)
  })
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

// 动态生成 nodejs、java、python等环境下的模板
config.plugins.push(function() {
  this.plugin("done", function(statsData) {
    var stats = statsData.toJson()

    if (!stats.errors.length) {
      var templateFile = 'index.tpl'
      var template = fs.readFileSync(path.join(__dirname, templateFile), 'utf8')

      var isJSP = option.has('--jsp')
      template = _.template(template)({
        isJSP: isJSP,
        hash: isProduction ? stats.hash : ''
      })
      // 默认nodejs环境
      var suffix = 'html'
      if (isJSP) {
        suffix = 'jsp'
      }

      fs.writeFileSync(path.join(__dirname, 'index.' + suffix), template)
    }
  })
})

module.exports = config