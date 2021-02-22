const { src, dest, task, series, watch, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const { stream } = require('browser-sync');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');


sass.compiler = require('node-sass');

task( 'clean', () => {
    return src( 'dist/**/*', { read: false })
      .pipe( rm() )
 })

task( 'copy:html', () => {
    return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
})

task( 'copy:img', () => {
    return src('src/styles/img/**')
    .pipe(dest('dist/styles/img'))
    .pipe(reload({ stream: true }));
})

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/main.scss'
   ];

task( 'styles', () => {
    return src(styles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
})

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bxslider/dist/jquery.bxslider.min.js',
    'node_modules/fancybox/dist/js/jquery.fancybox.js',
    'node_modules/mobile-detect/mobile-detect.min.js',
    'node_modules/jquery-touchswipe/jquery.touchSwipe.min.js',
    'src/scripts/*.js'
   ];

task("scripts", e => {
    return src(libs)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/scripts'))
        .pipe(reload({stream: true}));
})

// task('icons', () => {
//     return src('src/styles/img/*.svg')
//       .pipe(svgo({
//         // plugins: [
//         //   {
//         //     removeAttrs: {
//         //       attrs: '(fill|stroke|style|width|height|data.*)'
//         //     }
//         //   }
//         // ]
//       }))
//       .pipe(dest('dist/img/'));
//    });

task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        // open: false
    });
});

watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/scripts/*.js', series('scripts'));
// watch('./src/images/icons/*.svg', series('icons'));

task('default', series('clean', parallel('copy:html', 'styles', 'copy:img', 'scripts'), 'server'));