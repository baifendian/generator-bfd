var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var _ = require('underscore')
var autoprefixer = require('autoprefixer')

var option = process.argv.slice(2)
var isProduction = option[2] === '--production'

var engine
if (isProduction) {
  engine = option[3]
  if (!engine) {
    throw new Error('No template engine found, check the command line, eg: `npm run build -- jsp`')
  }
  var engines = ['ejs', 'jsp']
  if (engines.indexOf(engine) === -1) {
    throw new Error('Template engine only support `ejs`、`jsp`')
  }
} else {
  engine = 'ejs'
}

var config = {
  entry: {
    app: path.join(__dirname, 'src')
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
      loader: 'style!css!less'
    }]
  },
  postcss: [autoprefixer({ browsers: ['last 3 versions'] })],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      public: path.join(__dirname, 'src/public'),
      bfd: 'bfd-ui/lib'
    }
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
} else {
  config.devtool = '#source-map'
}


_.templateSettings = {
  interpolate: /\{\{=([^}]*)\}\}/g,
  evaluate: /\{\{(?!=)(.*?)\}\}/g
}

// 动态生成不同服务器环境下的模板文件
config.plugins.push(function() {
  this.plugin("done", function(statsData) {
    var stats = statsData.toJson()

    if (!stats.errors.length) {
      var templateFile = 'index.tpl'
      var template = fs.readFileSync(path.join(__dirname, templateFile), 'utf8')

      var openTag = '<%'
      var closeTag = '%>'

      if (engine === 'jsp') {
        openTag = '<#'
        closeTag = '#>'
      }

      template = _.template(template)({
        engine: engine,
        openTag: openTag,
        closeTag: closeTag,
        hash: isProduction ? stats.hash : ''
      })
      fs.writeFileSync(path.join(__dirname, 'index.' + engine), template)
    }
  })
})

module.exports = config