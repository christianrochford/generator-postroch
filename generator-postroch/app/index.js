'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var CustomGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Custom generator.'));

    var prompts = [{
      name: 'projectName',
      message: 'What name would you like to use for your project?',
      default: 'test'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('assets/dist/sass');
    this.mkdir('assets/dist/stylesheets');
    this.mkdir('assets/dist/img');
    this.mkdir('assets/dist/fonts');
    this.mkdir('assets/dist/icons');
    this.mkdir('assets/js');
    this.mkdir('assets/js/plugins');
    this.mkdir('assets/js/app');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');
    this.template('_index.html', 'assets/dist/index.html');
    this.copy('_bower.json', 'bower.json');
    this.copy('_.bowerrc', '.bowerrc');
    this.copy('_.gitignore', '.gitignore');
    this.copy('_config.rb', 'assets/dist/config.rb');
    this.copy('_colors.scss', 'assets/dist/sass/_colors.scss');
    this.copy('_base.scss', 'assets/dist/sass/_base.scss');
    this.copy('_fonts.scss', 'assets/dist/sass/_fonts.scss');
    this.copy('_zurb.scss', 'assets/dist/sass/_zurb.scss');
    this.copy('_mixins.scss', 'assets/dist/sass/_mixins.scss');
    this.copy('_header.scss', 'assets/dist/sass/_header.scss');
    this.copy('_footer.scss', 'assets/dist/sass/_footer.scss');
    this.copy('_screen.scss', 'assets/dist/sass/screen.scss');
    this.copy('_app.js', 'assets/js/app/app.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = CustomGenerator;