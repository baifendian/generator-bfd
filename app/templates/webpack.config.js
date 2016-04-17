var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var _ = require('underscore')
var autoprefixer = require('autoprefixer')

var option = new Set(process.argv)
var isProduction = option.has('--production')
var devServerPort = 9000

var config = {
  entry: {
    app: path.join(__dirname, 'src/index.jsx')
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
      loader: 'style!css!postcss'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'style!css!less!postcss'
    }]
  },
  postcss: [autoprefixer({ browsers: ['last 3 versions'] })],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {}
  },
  devServer: {
    port: devServerPort
  },
  plugins: []
}

if (isProduction) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    }
  }))
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