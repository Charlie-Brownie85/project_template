// Sass configuration
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// General options
var srcInput = './';
var output = 'dist/';

// Sass options
var sassInput = './scss/*.scss';
var sassOutput = './css/';
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compact' //nested, expanded, compact, compressed
  };

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
    });

    gulp.watch('scss/*/*.scss', ['sass', 'reload']);
    gulp.watch(['*.html'], ['reload']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp
        // Find all `.scss` files from the `stylesheets/` folder
        .src(sassInput)
        // Initialize sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
        // Run Sass on those files
        .pipe(sass(sassOptions).on('error', sass.logError))
        // Autoprefixer
        .pipe(postcss([ autoprefixer() ]))
        // Writting sourcemaps
        .pipe(sourcemaps.write('.'))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(sassOutput))

        // Reload browser to see changes
        .pipe(browserSync.stream())
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass-prod', function() {
    return gulp
        // Find all `.scss` files from the `stylesheets/` folder
        .src(sassInput)
        // Initialize sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
        // Run Sass on those files
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // Autoprefixer
        .pipe(postcss([ autoprefixer() ]))
        // Writting sourcemaps
        .pipe(sourcemaps.write('.'))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(output + 'css'))
});



gulp.task('reload', function() {
    browserSync.reload();
});


// Default task
gulp.task('default', ['serve']);


// Copying index.html task
gulp.task('index', function() {
    return gulp.src(srcInput + 'index.html*')
    .pipe(gulp.dest(output))
});


// Copying javascripts task
gulp.task('js', function() {
    return gulp.src(srcInput + 'js/*')
    .pipe(gulp.dest(output + 'js'))
});

// Copying fonts task
gulp.task('imgs', function() {
    return gulp.src(srcInput + 'img/**/*')
    .pipe(gulp.dest(output + 'img'))
});

// Copying fonts task
gulp.task('fonts', function() {
    return gulp.src(srcInput + 'fonts/**/*')
    .pipe(gulp.dest(output + 'fonts'))
});


// Copy task
gulp.task('copy', ['index', 'js','imgs', 'fonts']);

// Build task
gulp.task('build', ['sass-prod', 'copy']);