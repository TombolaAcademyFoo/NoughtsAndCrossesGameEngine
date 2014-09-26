'use strict';
var mocha = require('gulp-mocha');
module.exports = function(gulp) {
    gulp.task('smoke',['unittest'] ,function () {
        return gulp.src(['./smoketests/*.js'], {read: false})
            .pipe(mocha({reporter: 'nyan'}))
            .on('error', function(err){
                try {
                    throw testerror
                }
                catch (failed){
                    console.log(failed.name + ' ' + failed.message + ' ======================================= HOLY SMOKE!');
                    // uncomment to see stack trace
                    // throw err;
                }
            });
    })

};