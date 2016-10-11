'use strict'

var generators = require('yeoman-generator')
var mkdirp = require('mkdirp')

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments)
  },

  prompting: function() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'project name ?'
    }]).then(function (answers) {
      this.name = answers.name
      mkdirp(this.name)
      this.destinationRoot(this.name)
    }.bind(this))
  },

  writing: {
    folder: function() {
      ['bin', 'data', 'functions', 'public'].forEach(function(folder) {
        this.directory(this.templatePath(folder), this.destinationPath(folder))
      }, this)
    },

    dotedFiles: function() {
      ['gitignore', 'eslintrc'].forEach(function(file) {
        this.fs.copy(this.templatePath(file), this.destinationPath('.' + file))
      }, this)
    },

    files: function() {
      ['config.js', 'index.html', 'index.js', 'package.json', 'router.js', 'server.js', 'webpack.config.js'].forEach(function(file) {
        this.fs.copy(this.templatePath(file), this.destinationPath(file))
      }, this)
    },

    templateFiles: function() {
      ['README.md'].forEach(function(file) {
        this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), {
          name: this.name
        })
      }, this)
    }
  },

  installingLodash: function() {
    this.npmInstall()
  },

  end: function() {}
})