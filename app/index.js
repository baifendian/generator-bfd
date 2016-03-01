'use strict'

var generators = require('yeoman-generator')

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments)
    this.mkdir(this.appname)
    this.destinationRoot(this.appname)
  },

  writing: {
    test: function() {
      this.directory(this.templatePath('components'), this.destinationPath('components'))
    }
  },

  installingLodash: function() {
    // this.npmInstall();
  },

  end: function() {}
})