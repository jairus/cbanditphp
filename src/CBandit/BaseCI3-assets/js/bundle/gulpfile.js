/*

npm install -g gulp gulp-sass sass gulp-uglify gulp-concat gulp-clean-css gulp-sourcemaps

npm install gulp gulp-sass sass gulp-uglify gulp-concat gulp-clean-css gulp-sourcemaps --save-dev

*/
const  gulp = require('gulp');
const  sass = require('gulp-sass')(require('sass'));
const  minify = require('gulp-uglify');
const  concat = require('gulp-concat');
const  cleanCss = require('gulp-clean-css');
const  sourcemaps = require('gulp-sourcemaps');

gulp.task('bundle', function() {
	return gulp.src(
		[
			'src/JavaScript-Load-Image-2.26.0/js/load-image.all.min.js',
			'src/fileuploader.js',
			'src/fs.js',
			'src/localdata.js',
			'src/charts.js',
		],	
	)
	.pipe(sourcemaps.init({
		loadMaps: true
	}))
	.pipe(minify())
	.pipe(concat("bundle.js"))
	.pipe(gulp.dest("dist"));
	//.pipe(browserSync.stream());
});