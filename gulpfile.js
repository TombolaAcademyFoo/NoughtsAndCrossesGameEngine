var gulp = require('gulp');
var cleaner = require('./.gulp/clean');
var linter = require('./.gulp/lint');
var unittester = require('./.gulp/test');
var servicestarter = require('./.gulp/startservice')
var smoker = require('./.gulp/smoke');

var debug = false;

cleaner(gulp);
linter(gulp);
unittester(gulp);
servicestarter(gulp);
smoker(gulp);
gulp.task('default', ['clean','lint','unittest', 'smoke', 'startservice'], function() {
        debug || false;
    }

);

gulp.task('nostart', ['clean','lint', 'unittest', 'smoke'], function() {
        debug || false;
    }

);