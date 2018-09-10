// Sass configuration
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// Sass options
var input = './scss/*.scss';
var output = './css/';
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compact' //nested, expanded, compact, compressed
  };

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
    });

    gulp.watch('*.scss', ['sass']);
    gulp.watch(['*.html', '*.css'], ['reload']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp
        // Find all `.scss` files from the `stylesheets/` folder
        .src(input)
        // Initialize sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
        // Run Sass on those files
        .pipe(sass(sassOptions).on('error', sass.logError))
        // Autoprefixer
        .pipe(postcss([ autoprefixer() ]))
        // Writting sourcemaps
        .pipe(sourcemaps.write('.'))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(output))

        // Reload browser to see changes
        .pipe(browserSync.stream())
});


// Task for Production
gulp.task('prod', ['sassdoc'], function () {
    return gulp
      .src(input)
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest(output));
  });


gulp.task('reload', function() {
    browserSync.reload();
});


// Default task
gulp.task('default', ['serve']);