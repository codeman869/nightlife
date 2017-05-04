'use strict'
let gulp = require('gulp');
let pug = require('gulp-pug');
let bowerFiles = require('gulp-main-bower-files');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');


let srcDirectory = './app/src';
let distDirectory = './public';
let vendorDirectory = './public/assets/vendors';

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

gulp.task('copyVendorJS', () => {
    
    gulp.src('./bower.json').pipe(bowerFiles())
        .pipe(gulp.dest(vendorDirectory));
    
});

gulp.task('copyVendorJSMini', () => {
    
    gulp.src('./bower.json').pipe(bowerFiles())
        .pipe(uglify())
        .pipe(gulp.dest(vendorDirectory));
    
});

gulp.task('copyJSMini', () => {
    
    gulp.src(`${srcDirectory}/**/*.js`)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(distDirectory));
    
});

gulp.task('build', ['compileHTML', 'copyJS', 'copyVendorJS']);

gulp.task('build:dist', ['compileHTML', 'copyJSMini', 'copyVendorJSMini']);