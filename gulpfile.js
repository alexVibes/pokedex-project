var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	myth = require('gulp-myth'),
	autoprefixer = require('autoprefixer-stylus'),
	del = require('del'),
	uglify = require('gulp-uglify');

gulp.task('html', function() {
	gulp.src('./src/**/*.html')
		.on('error', console.log)
		.pipe(gulp.dest('./public/'));
});

gulp.task('stylus', function() {
	gulp.src('./src/stylus/**/*.styl')
		.pipe(stylus({
			use: [autoprefixer('last 2 versions')]
		}))
		.on('error', console.log)
		.pipe(myth())
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function() {
	gulp.src('./src/js/**/*.js')
		.on('error', console.log)
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('fonts', function() {
	gulp.src('./src/fonts/*.*')
		.on('error', console.log)
		.pipe(gulp.dest('./public/fonts/'));
});

gulp.task('clean', function() {
	del('public');
});

gulp.task('build', function() {
	gulp.run('clean');
	gulp.run('html');
	gulp.run('stylus');
	gulp.run('js');
	gulp.run('fonts');
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.html', function() {
		gulp.run('html');
	});
	gulp.watch('src/stylus/*.styl', function() {
		gulp.run('stylus');
	});
	gulp.watch('src/js/**/*.js', function() {
		gulp.run('js');
	});
});

gulp.task('default',['clean', 'html', 'stylus', 'js', 'watch']);