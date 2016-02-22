var gulp = require('gulp'),
	sass = require('gulp-sass'),
	nano = require('gulp-cssnano'),
	minifyCss = require('gulp-minify-css'),
	rename = require('gulp-rename');

var imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

/* Compress images */
gulp.task('images', function() {
	return gulp.src('./images-uncompressed/*.+(jpg|jpeg|gif|png|svg)')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./images/'));
});

/* Compile sass and minify css */
gulp.task('styles', function() {
	gulp.src('src/*.scss')
		.pipe(sass({outputStyle: 'nested'})
			.on('error', sass.logError))
		.pipe(gulp.dest('./css/'))
		.pipe(rename({suffix: '.min'}))
		//.pipe(nano({zindex:false}))
		.pipe(minifyCss())
		.pipe(gulp.dest('./css/'))
	;
});

/* Watch sass file changes */
gulp.task('watch', function() {
	gulp.watch('src/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch'], function() {

});