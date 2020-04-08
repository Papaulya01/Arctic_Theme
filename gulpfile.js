var gulp = require('gulp')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require ('browser-sync')
browserSync.create()

//liveserver
function sync(done) {
    browserSync.init({
        server: {
            basedir: './'
        },
        port: 3000
    })
    done()
}

//препроцессор + минификатор
function prepros () {
    return  gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream())
}

//Прослеживание изменений
function watchFiles(done) {
    gulp.watch('./scss/**/*', prepros)
    gulp.watch('./**/*.html', browserReload)
    gulp.watch('./**/*.php', browserReload)
    gulp.watch('./**/*.js', browserReload)
}
function browserReload(done){
    browserSync.reload()
    done()
}

gulp.task('default', gulp.parallel(  sync, watchFiles))



