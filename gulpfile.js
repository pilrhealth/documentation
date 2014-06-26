var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('watch', function() {

    // Create LiveReload server
    var server = livereload();

    // Watch any files in dist/, reload on change
    gulp.watch(['./src/**']).on('change', function(file) {
        server.changed(file.path);
    });

});
