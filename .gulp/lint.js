'use strict';

var path = require('path'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish');

module.exports = function (gulp) {
    gulp.task('lint-noughts-and-crosses', ['clean'], function () {
        return gulp.src(['../noughts-and-crosses/*.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter("fail"))
            .on('error', function (err) {
                // Make sure failed lint causes gulp to exit non-zero
                throw err;
            });
    });
    gulp.task('lint-api', ['clean'], function () {
        return gulp.src(['../api/*.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter("fail"))
            .on('error', function (err) {
                // Make sure failed lint causes gulp to exit non-zero
                throw err;
            });
    });

    gulp.task('lint-tests', ['clean'], function () {
        return gulp.src(['./tests/*.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter("fail"))
            .on('error', function (err) {
                // Make sure failed lint causes gulp to exit non-zero
                throw err;
            });
    });

    gulp.task('lint-smoke', ['clean'], function () {
        return gulp.src(['./smoketests/*.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter("fail"))
            .on('error', function (err) {
                // Make sure failed lint causes gulp to exit non-zero
                throw err;
            });
    });

    gulp.task('lint-app', ['clean'], function () {
        return gulp.src(['./app.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter("fail"))
            .on('error', function (err) {
                // Make sure failed lint causes gulp to exit non-zero
                throw err;
            });
    });

    gulp.task('lint', ['clean','lint-noughts-and-crosses', 'lint-tests', 'lint-api', 'lint-app', 'lint-smoke'])
};