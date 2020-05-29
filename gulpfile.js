const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const ngAnnotate = require('gulp-ng-annotate')
const sourcemaps = require('gulp-sourcemaps')
const nodemon = require('gulp-nodemon')

gulp.task('hello', () => {
    console.log('hello')
})

// Prepares client JS
gulp.task('js', function() {
    gulp.src(['client/ng/module.js', 'client/ng/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/assets'))
})

gulp.task('watch', function() {
    gulp.watch('client/ng/**/*.js', ['js'])
})

// Starts server, monitored
gulp.task('dev:server', function(){
    nodemon({
        script: 'server/server.js',
        ext: 'js',
        ignore: ['gulp*', 'assets']
    })
})
