'use strict'

var generators = require('yeoman-generator')

module.exports = generators.Base.extend({

  installingLodash: function() {
    this.npmInstall();
  },

  writing: {
    test: function() {
      this.directory(this.templatePath(), this.destinationPath())
    }
  },

  end: function() {}
})