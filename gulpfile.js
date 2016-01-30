/**

//del gulp-jade jeet gulp-postcss gulp-rigger gulp-uglify --save-dev
npm i gulp gulp-stylus gulp-sourcemaps autoprefixer-stylus gulp-postcss --save-dev

список
npm list --depth=0 -g
npm link browser-sync jeet / unlink

devDependencies - пакеты только для разработчиков. Mодули из devDependencies не будут установлены в production
dependencies — пакеты для конечного потребителя. Библиотеки от которых зависит проект (expressjs, jquery, backbone)


 */

var gulp = require('gulp'),

	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer-stylus'),


	stylus = require('gulp-stylus'),
	//originalStylus = require('gulp-stylus').stylus,
	sourcemaps = require('gulp-sourcemaps'),
	jeet = require('jeet'),

	//rigger = require('gulp-rigger'),
	browserSync = require('browser-sync');


function onError(err) {
	var exec = require('child_process').exec;
	exec('afplay ./error_2.mp3');
	//console.log(err.toString());
	console.log(err);
	this.emit("end");
}


// ==  TASKS  ==

// STYLUS
gulp.task('stylusTask', function() {

	gulp.src('./app/styles/common.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus({

			use: [
				jeet(),
				autoprefixer() //{browsers: ['last 1 version']}
			],
			compress: true
		}))
		.on("error", onError)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/css'));
});

// External sourcemaps
// gulp.task('sourcemaps-external', function () {
//   return gulp.src('./app/styles/sourcemaps-external.styl')
//     .pipe(sourcemaps.init())
//     .pipe(stylus())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./build/css'));
// });
//


// HTML
/*gulp.task('htmlTask', function() {
	gulp.src(path.src.html) //Выберем файлы по нужному пути
		.pipe(rigger()) //Прогоним через rigger
		.pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});*/


// BrowserSync
gulp.task('browserSyncTask', function() {
	browserSync.init(['./build/*.html', './build/css/*.css'], {
		server: {
			baseDir: "./build/"
		}
	});
});


// WATCH
gulp.task('watchTask', function() {
	//gulp.watch('./app/templates/**/*.jade', ['jadeTask']);
	gulp.watch('./app/styles/**/*.styl', ['stylusTask']);
	//gulp.watch('./app/scripts/**/*.js', ['javascriptTask']);
});


// DEFAULT
gulp.task('default', ['stylusTask', 'watchTask', 'browserSyncTask']);
//gulp.task('min', ['jade-minTask', 'stylusTask', 'javascriptTask', 'browserSyncTask', 'watchTask']);
