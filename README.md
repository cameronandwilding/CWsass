## CWsass

This Yeoman generator will provide you with a biased set of tools for rapid, structured Sass authoring.

By default when scaffolding a project using this tool, it will download [node-sass](https://www.npmjs.com/package/node-sass). You are then
given a series of options for what else to include in your project. These are based on a recommended workflow of Gulp + Libsass.

* [Gulp](http://gulpjs.com/)
* [Gulp sass](https://www.npmjs.com/package/gulp-sass)
* Recommended sass authoring structure (based on [SMACSS](https://smacss.com/) )
* [Sassdoc](http://sassdoc.com/)
* [Sourcemaps (Gulp integration)](http://thesassway.com/intermediate/using-source-maps-with-sass)
* [Browsersync](https://www.browsersync.io/)
* [Autoprefixer (Gulp integration)](https://css-tricks.com/autoprefixer/)
* [Sass linting (Gulp integration)](https://www.npmjs.com/package/sass-lint)
* [Susy grid system](http://susy.oddbird.net/) - it's up to you to configure the settings and choose where in your Sass to import.
* [Breakpoint module](http://breakpoint-sass.com/) - it's up to you to choose where in your Sass to import.

[Sass documentation](http://sass-lang.com/)

### Installation

Firstly, ensure you have node.js installed on your system. You can download it from [here](https://nodejs.org/en/)

With node.js installed, head to the command line to install Yeoman:

```bash
npm install -g yo
```

```bash
npm install -g generator-cwsass
```

Then initiate the generator from within your desired directory:

```bash
yo cwsass
```

### A note on Browserync config

The local proxy's address you've set up may not be the same as a collaborator's (mylocalsite.dev etc). For this reason,
you'll find a file called example.browserSyncConfig.js in your project. Before editing the contents of this file, rename it and save it
as browserSyncConfig.js. Then edit it with your local proxy info. This file is registered in the gitignore, so you
won't have conflict issues with collaborators.

If you try to run a gulp command before renaming the file, you'll receive the following error:

```bash
Error: Cannot find module './browserSyncConfig'
```

### Gulp commands

Assuming a complete install of all options, the following command line options are available (these will be reduced if you've chosen not to install some parts):

This will start Gulp watching for changes in the sass directory, and trigger Autoprefixer and Sourcemaps upon compilation into CSS.
It will also by default open your browser pointing to the proxy you've defined in browserSyncConfig.js:
```bash
gulp
```

The first time the Sass renders, you will find a new CSS directory is created containing the rendered, minified CSS.

If you want a one-time compilation of your Sass (with Autoprefixer and Sourcemaps) without Browsersync, run:
```bash
gulp sass
```

If you want your Sass linted, run:
```bash
gulp sass-lint
```

If you want your Sassdoc to compile the Sass documentation into a document, run:
```bash
gulp sassdoc
```

This will create a new directory called sassdoc, open the index.html file inside to see the documentation.

## License

MIT
