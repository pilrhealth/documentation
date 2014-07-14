var gulp = require('gulp');  
var gutil = require('gulp-util');  
var clean = require('gulp-clean');  
var concat = require('gulp-concat'); 
var flatten = require('gulp-flatten');
var minify_css = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var watch  = require('gulp-watch');
var debug =  require('gulp-debug');
var assign = require('lodash.assign');
var gulp_front_matter = require('gulp-front-matter');
var gulpsmith = require('gulpsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    Handlebars  = require('handlebars'),
    fs          = require('fs'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks');


var js_dir = './build/assets/javascripts';
var css_dir = './build/assets/styles';
var inst_dir = './build';

Handlebars.registerPartial('header', 
                           fs.readFileSync(__dirname +
'/templates/partials/header.hbt').toString());

Handlebars.registerPartial('footer', 
                           fs.readFileSync(__dirname +
'/templates/partials/footer.hbt').toString());


gulp.task('clean', function () {  
    return gulp.src('build', {read: false})
        .pipe(clean());
});

// process bower_components
gulp.task('js_bower_components', function() {
    gulp.src(['src/assets/**/*.min.js']) 
        .pipe(flatten())
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(js_dir));
});

// process bower css
gulp.task('css_bower_components', function() {
  gulp.src('./src/assets/**/*.css')
        .pipe(concat('bower.css'))
        .pipe(minify_css({keepBreaks:true}))
        .pipe(gulp.dest(css_dir));
});

// process markdown files using metalsmith
gulp.task('metalsmith', function() {
    gulp.src('src/**/*.md')
        .pipe(gulp_front_matter()).on("data", function(file) {
            assign(file, file.frontMatter); 
            delete file.frontMatter;
        })
        .pipe(
            gulpsmith()
                .use(collections({
                    pages: {
                        pattern: 'content/pages/*.md'
                    }
                }))
                .use(markdown())
                .use(permalinks({
                    pattern: ':collection/:title'
                }))
                .use(templates('handlebars')))
        .pipe(gulp.dest(inst_dir));
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
    gulp.watch('./src/index.md', ['metalsmith']);
    gulp.watch('./src/content/**/*.md', ['metalsmith']);
});

// default task, build
gulp.task('default', ['metalsmith', 'js_bower_components', 'css_bower_components']);

// server task, test
gulp.task('server', ['metalsmith', 'js_bower_components', 'css_bower_components',
                     'watch', 'webserver', 'livereload']);


