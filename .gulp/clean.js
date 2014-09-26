'use strict';

var util = require('util'),
    clean = require('gulp-clean');

module.exports = function (gulp) {
    gulp.task('clean', function () {
        return gulp.src(util.format('%s/.build', process.cwd()))
            .pipe(clean());
    });
};
