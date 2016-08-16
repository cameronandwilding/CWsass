'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var git = require('simple-git')();
var rmdir = require('rimraf');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Cameron and Wilding Sass generator!'
    ));

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What tools would you like to include in your installation?',
      choices: [{
        name: 'Gulp',
        value: 'includeGulp',
        checked: true
      },{
        name: 'Sass (Libsass)',
        value: 'includeSass',
        checked: true
      },{
        name: 'Our recommended Sass Structure',
        value: 'includeSassStructure',
        checked: true
      },{
        name: 'Sassdoc',
        value: 'includeSassdoc',
        checked: true
      },{
        name: 'Sourcemaps',
        value: 'includeSourcemaps',
        checked: true
      },{
        name: 'Sass linting',
        value: 'includeSasslint',
        checked: true
      },{
        name: 'Autoprefixer',
        value: 'includeAutoprefixer',
        checked: true
      },{
        name: 'The Susy grid system',
        value: 'includeSusy',
        checked: true
      },{
        name: 'Breakpoint',
        value: 'includeBreakpoint',
        checked: true
      },{
        name: 'BrowserSync',
        value: 'includeBrowsersync',
        checked: true
      },]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      // manually deal with the response, get back and store the results.
      this.includeGulp = hasFeature('includeGulp');
      this.includeSass = hasFeature('includeSass');
      this.includeSassStructure = hasFeature('includeSassStructure');
      this.includeSassdoc = hasFeature('includeSassdoc');
      this.includeSasslint = hasFeature('includeSasslint');
      this.includeSourcemaps = hasFeature('includeSourcemaps');
      this.includeBrowsersync = hasFeature('includeBrowsersync');
      this.includeAutoprefixer = hasFeature('includeAutoprefixer');
      this.includeSusy = hasFeature('includeSusy');
      this.includeBreakpoint = hasFeature('includeBreakpoint');

      done();
    }.bind(this));
  },

  writing: {
    gulpfile: function () {
      if(this.includeGulp) {
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            {
              date: (new Date).toISOString().split('T')[0],
              name: this.pkg.name,
              version: this.pkg.version,
              includeGulp: this.includeGulp,
              includeSass: this.includeSass,
              includeSassdoc: this.includeSassdoc,
              includeSasslint: this.includeSasslint,
              includeSourcemaps: this.includeSourcemaps,
              includeBrowsersync: this.includeBrowsersync,
              includeAutoprefixer: this.includeAutoprefixer
            }
        );
      }
    },

    browsersync: function () {
      if(this.includeBrowsersync) {
        this.fs.copy(
            this.templatePath('example.browserSyncConfig.js'),
            this.destinationPath('example.browserSyncConfig.js')
        );
      }
    },

    gitignore: function () {
      this.fs.copy(
          this.templatePath('gitignore'),
          this.destinationPath('.gitignore')
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          {
            includeGulp: this.includeGulp,
            includeSass: this.includeSass,
            includeSassdoc: this.includeSassdoc,
            includeSasslint: this.includeSasslint,
            includeSourcemaps: this.includeSourcemaps,
            includeBrowsersync: this.includeBrowsersync,
            includeAutoprefixer: this.includeAutoprefixer,
            includeSusy: this.includeSusy,
            includeBreakpoint: this.includeBreakpoint
          }
      );
    },

    bowerJSON: function () {
      this.fs.copyTpl(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json'),
          {}
      );
    },

    sassStructure: function () {
      if(this.includeSassStructure) {
        this.fs.copyTpl(
          this.templatePath('sass'),
          this.destinationPath('sass')
        );
      }
    },

    sassLint: function() {
      if(this.includeSasslint) {
        this.fs.copy(
          this.templatePath('.sass-lint.yml'),
          this.destinationPath('.sass-lint.yml')
        );
      }
    }
  },

  install: function () {
    this.installDependencies();
  }
});
