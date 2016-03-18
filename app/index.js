'use strict'

var generators = require('yeoman-generator')
var mkdirp = require('mkdirp')

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments)

    var option = process.argv.slice(3)

    if (option[0]) {
      this.appname = option[0]
      mkdirp(this.appname)
      this.destinationRoot(this.appname)
    }
  },

  writing: {
    folder: function() {
      ['components', 'data', 'less'].forEach(function(folder) {
        this.directory(this.templatePath(folder), this.destinationPath(folder))
      }, this)
    },

    dotedFiles: function() {
      ['gitignore'].forEach(function(file) {
        this.fs.copy(this.templatePath(file), this.destinationPath('.' + file))
      }, this)
    },

    files: function() {
      ['app.jsx', 'routes.js', 'index.tpl', 'package.json', 'server.js', 'webpack.config.js'].forEach(function(file) {
        this.fs.copy(this.templatePath(file), this.destinationPath(file))
      }, this)
    }
  },

  installingLodash: function() {
    this.npmInstall()
  },

  end: function() {}
})