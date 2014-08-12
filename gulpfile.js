var gulp        = require('gulp');  
var gutil       = require('gulp-util');  
var clean       = require('gulp-clean');  
var concat      = require('gulp-concat'); 
var flatten     = require('gulp-flatten');
var minify_css  = require('gulp-minify-css');
var livereload  = require('gulp-livereload');
var connect     = require('gulp-connect');
var watch       = require('gulp-watch');
var debug       = require('gulp-debug');
var assign      = require('lodash.assign');
var gulp_fm     = require('gulp-front-matter');
var gh_pages    = require('gulp-gh-pages');
var gulpsmith   = require('gulpsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var Handlebars  = require('handlebars');
var fs          = require('fs');
var collections = require('metalsmith-collections');
var permalinks  = require('metalsmith-permalinks');
var replace     = require('gulp-replace');

var js_dir    = './build/documentation/assets/javascripts';
var css_dir   = './build/documentation/assets/styles';
var image_dir = './build/documentation/assets/images';
var inst_dir  = './build/documentation';

var glossary  = require('./src/content/pages/pilr-glossary.json');
var glossary_html = '';
for(var term in glossary) {
    glossary_html = glossary_html + 
        '<dt>' + term + '</dt>' + '\n' + '<dd>' + glossary[term] + 
        '</dd>\n';
}

Handlebars.registerPartial('header', 
                           fs.readFileSync(__dirname +
'/templates/partials/header.hbt').toString());

Handlebars.registerPartial('footer', 
                           fs.readFileSync(__dirname +
'/templates/partials/footer.hbt').toString());


// A fresh start! `gulp clean` removes the local build directory. 
gulp.task('clean', function () {  
    return gulp.src('build', {read: false})
        .pipe(clean());
});

// process bower_components
gulp.task('js_bower_components', function() {
    gulp.src(['src/assets/jquery/dist/jquery.min.js', 'src/assets/**/*.min.js']) 
        .pipe(flatten())
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(js_dir));
});

// process css (bower and custom)
gulp.task('css_bower_components', function() {
  gulp.src(['./src/assets/**/*.min.css', './src/css/*.min.css'])
        .pipe(concat('bower.css'))
        .pipe(minify_css({keepBreaks:true}))
        .pipe(gulp.dest(css_dir));
});

gulp.task('images', function() {
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest(image_dir));
});

// process markdown files using metalsmith
gulp.task('metalsmith', function() {
    gulp.src(['src/**/*.md', 'src/index.md', '/templates/**/*.hbt'])
        .pipe(gulp_fm()).on("data", function(file) {
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
        .pipe(replace(/\[\[glossary_content\]\]/g, 
                      glossary_html))
        .pipe(replace(/\[\[(\w+)\]\]/g, 
                      function(match, p1) { 
                          return('<span style="border-bottom: 1px dotted #000; text-decordation: none" title="' + 
                                 glossary[p1] + '">' + p1 + '</span>');
                      }))
        .pipe(gulp.dest(inst_dir));
});

// start server with livereload support
gulp.task('webserver', function() {
    connect.server({livereload : true, root : ['build']});
});

// livereload for development
gulp.task('livereload', function() {
    gulp.src(['./build/**/*'])
        .pipe(watch())
        .pipe(connect.reload());
});

// watch files
gulp.task('watch', function() {
    gulp.watch('./src/assets/**/*.js', ['js_bower_components']);
    gulp.watch('./src/assets/**/*.css', ['css_bower_components']);
    gulp.watch('./src/index.md', ['metalsmith']);
    gulp.watch('./src/content/**/*.json', ['metalsmith']);
    gulp.watch('./templates/**/*.hbt', ['metalsmith']);
    gulp.watch('./src/content/**/*.md', ['metalsmith']);
});

// publish build directory to gh-pages branch
gulp.task('gh-pages', function() {
    gulp.src('./build/documentation/**/*')
        .pipe(gh_pages());
});

// default task, build
gulp.task('default', ['metalsmith', 'js_bower_components', 
                      'css_bower_components', 'images']);

// server task
gulp.task('server', ['default', 'watch', 'webserver', 'livereload']);

// deploy task
gulp.task('deploy', ['default', 'gh-pages']);
