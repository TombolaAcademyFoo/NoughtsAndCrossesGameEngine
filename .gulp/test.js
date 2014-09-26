'use strict';
var mocha = require('gulp-mocha');
module.exports = function(gulp) {
    gulp.task('unittest',['clean', 'lint'] ,function () {
        return gulp.src(['./tests/*.js'], {read: false})
            .pipe(mocha({reporter: 'nyan'}))
            .on('error', function(err){
                try {
                    throw testerror
                }
                catch (failed){
                    console.log(failed.name + ' ' + failed.message + ' ======================================= ');
                    // uncomment to see stack trace
                    // throw err;
                }
            });
    })

};