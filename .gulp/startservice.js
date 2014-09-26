'use strict';
var server = require('gulp-express');

module.exports = function (gulp) {
    gulp.task('startservice', ['smoke'], function () {
        server.run({
            file: './app.js'
        });
    });
};