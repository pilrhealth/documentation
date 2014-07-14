var gulp = require('gulp');  
var gutil = require('gulp-util');  
var clean = require('gulp-clean');  
var concat = require('gulp-concat'); 
var flatten = require('gulp-flatten');
var minify_css = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var watch  = require('gulp-watch');

var js_dir = './build/assets/javascripts';
var css_dir = './build/assets/styles';
var inst_dir = './build';

gulp.task('clean', function () {  
    return gulp.src('build', {read: false})
        .pipe(clean());
});

// process bower_components
gulp.task('js_bower_components', function() {
    gulp.src(['client/bower_components/**/*.min.js']) 
        .pipe(flatten())
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(js_dir));
});

// process bower css
gulp.task('css_bower_components', function() {
  gulp.src('./client/bower_components/**/*.css')
        .pipe(concat('bower.css'))
        .pipe(minify_css({keepBreaks:true}))
        .pipe(gulp.dest(css_dir));
});

// process index.html
gulp.task('html_index', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest(inst_dir))
        .on('error', gutil.log);
});


// start server with livereload support
gulp.task('webserver', function() {
    connect.server({livereload : true, root : ['build']});
});

// livereload for development
gulp.task('livereload', function() {
  gulp.src(['./build/assets/**/*.js', './build/assets/**/*.css', 
            './build/index.html'])
    .pipe(watch())
    .pipe(connect.reload());
});

// watch files
gulp.task('watch', function() {
    gulp.watch('./src/assets/**/*.js', ['js_bower_components']);
    gulp.watch('./src/assets/**/*.css', ['css_bower_components']);
    gulp.watch('./src/index.md', ['html_index']);
});

// default task, build
gulp.task('default', ['html_index', 'js_bower_components', 'css_bower_components']);

// server task, test
gulp.task('server', ['html_index', 'js_bower_components', 'css_bower_components',
                     'watch', 'webserver', 'livereload']);


