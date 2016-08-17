/**
 * @file
 *
 * Manages the configuration settings for the Gulp task runner.
 */

'use strict';

// Gulp modules and general variables.
var gulp = require('gulp');<% if (includeSass) { %>
var sass = require('gulp-sass');<% } %><% if (includeSassdoc) { %>
var sassdoc = require('sassdoc');<% } %><% if (includeSourcemaps) { %>
var sourcemaps = require('gulp-sourcemaps');<% } %><% if (includeBrowsersync) { %>
var browserSync = require('browser-sync');
var browserSyncConfig = require('./browserSyncConfig');<% } %><% if (includeAutoprefixer) { %>
var autoprefixer = require('gulp-autoprefixer');<% } %><% if (includeSasslint) { %>
var sassLint = require('gulp-sass-lint');<% } %>

// Specify the patterns of files to watch / compile.
var globs = {
    sass:     'sass/**/*.scss'
};

<% if (includeSass) { %>/**
 * Gulp task: Sass
 * Processes our Sass .scss files into CSS, and also handles creation
 * of CSS sourcemaps for better dev tools debugging.
 */
gulp.task('sass', function() {
    return gulp.src(globs.sass)
        <% if (includeSourcemaps) { %>.pipe(sourcemaps.init())<% } %>
    .pipe(sass({
        outputStyle: 'compressed',
        errLogToConsole: true
    }))
    .on('error', function (error) {
        console.error('Error!', error.message);
        this.emit('end');
    })
    <% if (includeAutoprefixer) { %>.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))<% } %>
    <% if (includeSourcemaps) { %>.pipe(sourcemaps.write('.'))<% } %>
    .pipe(gulp.dest('css/'));
});

<% if (includeSasslint) { %>
/**
 * Gulp task: Sasslint
 * Not part of our normal sass chain as it slows the process down, this lints the sass files based on the options in
 * .sass-lint.yml
 */
gulp.task('sass-lint', function() {
    return gulp.src(globs.sass)
    .pipe(sassLint({
            config: './.sass-lint.yml'
        }))
          .pipe(sassLint.format())
          .pipe(sassLint.failOnError())
}); <% } %> // End if (includeSasslint)
<% } %> // End if (includeSass)

<% if (includeSassdoc) { %>/**
 * Gulp task: Sassdoc
 * Rebuilds our sass documentation.
 */
gulp.task('sassdoc', function () {
    gulp.src(globs.sass)
    .pipe(sassdoc({
        dest: 'sassdoc'
    }));
});<% } %>

/**
 * Gulp task: [default]
 * Watches our files for changes.
 */
gulp.task('default', null, function() {
    <% if (includeBrowsersync) { %>// Create the BrowserSync proxy
    browserSync({
        notify: true,
        open: true,
        proxy: browserSyncConfig.browsersync.proxy,
        // Uncomment the following and specify your port in browserSyncConfig.js if a custom port is needed:
        // port: browserSyncConfig.browsersync.port
    });<% } %>

    // Watch our files, run tasks on changes.
    <% if (includeSass) { %>gulp.watch(globs.sass, ['sass'<% if (includeBrowsersync) { %>, browserSync.reload<% } %>]);<% } %>
});
