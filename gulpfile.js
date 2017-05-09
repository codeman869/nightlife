'use strict'
let gulp = require('gulp');
let pug = require('gulp-pug');
let bowerFiles = require('gulp-main-bower-files');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
let filter = require('gulp-filter');

let srcDirectory = './app/src';
let distDirectory = './public';
let vendorDirectory = './public/assets/vendors';
let filterJS = filter('**/*.js', {restore: true});
let filterCSS = filter('**/*.css', {restore: true});

gulp.task('compileHTML', () => {
    gulp.src(srcDirectory+"/**/*.pug")
        .pipe(pug())
        .pipe(gulp.dest(distDirectory));
    
});

gulp.task('copyJS', () => {
    
    gulp.src(`${srcDirectory}/**/*.js`)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(distDirectory));
    
});

gulp.task('copyVendor', () => {
    
    gulp.src('./bower.json')
        .pipe(bowerFiles(
            {
                overrides: {
                    bootstrap: {
                        main: [
                            './dist/js/bootstrap.js',
                            './dist/css/*.min.*',
                            './dist/fonts/*.*'
                            
                            ]
                    }
                }
            }
        
        ))
        .pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(filterJS.restore)
        .pipe(gulp.dest(vendorDirectory));
    
});

gulp.task('copyVendorMini', () => {
    
    gulp.src('./bower.json')
        .pipe(bowerFiles(
            {
                overrides: {
                    bootstrap: {
                        main: [
                            './dist/js/bootstrap.js',
                            './dist/css/*.min.*',
                            './dist/fonts/*.*'
                            
                            ]
                    }
                }
            }
        
        ))
        .pipe(filterJS)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(filterJS.restore)
        .pipe(gulp.dest(vendorDirectory));
    
});

gulp.task('copyJSMini', () => {
    
    gulp.src(`${srcDirectory}/**/*.js`)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(distDirectory));
    
});

gulp.task('build', ['compileHTML', 'copyJS', 'copyVendor']);

gulp.task('build:dist', ['compileHTML', 'copyJSMini', 'copyVendorMini']);