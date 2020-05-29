const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const ngAnnotate = require('gulp-ng-annotate')
const sourcemaps = require('gulp-sourcemaps')
const nodemon = require('gulp-nodemon')

gulp.task('hello', () => {
    console.log('hello')
})

gulp.task('js', function() {
    gulp.src(['ng/module.js', 'ng/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
})

gulp.task('watch', function() {
    gulp.watch('ng/**/*.js', ['js'])
})

gulp.task('dev:server', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['gulp*', 'assets']
    })
})
