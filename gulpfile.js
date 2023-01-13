'use strict';

import gulp from 'gulp';
import fs from 'fs';
import autoprefixer from 'gulp-autoprefixer';
import group_media from 'gulp-group-css-media-queries';
import plumber from 'gulp-plumber';
import del from 'del';
import rename from 'gulp-rename';
import clean_css from 'gulp-clean-css';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';
import webpcss from 'gulp-webpcss';
import webphtml from 'gulp-webp-html-nosvg';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import webpack from 'webpack-stream';

const projectName = 'dist';
const srcFolder = 'src';
const { src, dest } = gulp;

import webPackConfig from './config/webpack.prod.js';

const path = {
	build: {
		html: `${projectName}/`,
		tpl: `${projectName}/tpl/`,
		js: `${projectName}/js/`,
		libs: `${projectName}/libs/`,
		css: `${projectName}/css/`,
		scss: `${projectName}/css/`,
		images: `${projectName}/img/`,
		fonts: `${projectName}/fonts/`,
		others: `${projectName}/others/`
	},
	src: {
		html: [`${srcFolder}/**/*.html`, `!${srcFolder}/_*.html`],
		tpl: [`${srcFolder}/html/*`],
		js: [`${srcFolder}/js/**/*`],
		libs: [`${srcFolder}/libs/**/*`],
		scss: [`${srcFolder}/scss/**/*`],
		css: `${srcFolder}/scss/style.scss`,
		images: [`${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,webm,mp4}`, '!**/favicon.*'],
		svg: [`${srcFolder}/img/**/*.svg`, '!**/favicon.*'],
		others: [`${srcFolder}/others/**/*`],
		fonts: `${srcFolder}/fonts/**/*`
	},
	clean: `./${projectName}/`
};

// Функция очистки папки с результатом
function clean() {
	return del(path.clean);
}
// Вспомогательная функция
function cb() {}
// Создание файла .gitignore
function addGitIgnore() {
	if (!fs.existsSync('.gitignore')) {
		fs.writeFile('./.gitignore', '', cb);
		fs.appendFile('./.gitignore', 'package-lock.json\r\n', cb);
		fs.appendFile('./.gitignore', 'node_modules/\r\n', cb);
		fs.appendFile('./.gitignore', '.gitignore\r\n', cb);
		fs.appendFile('./.gitignore', 'dist/\r\n', cb);
		fs.appendFile('./.gitignore', 'Source/\r\n', cb);
		fs.appendFile('./.gitignore', 'version.json\r\n', cb);
		fs.appendFile('./.gitignore', projectName + '\r\n', cb);
		fs.appendFile('./.gitignore', '**/*.zip\r\n', cb);
		fs.appendFile('./.gitignore', '**/*.rar\r\n', cb);
		//if (projectName !== 'flsStart') del('./.git/');
	}
	return src(path.src.html);
}

// Шрифты
function fontsConverter() {
	src(path.src.fonts).pipe(plumber()).pipe(ttf2woff()).pipe(dest(path.build.fonts));
	return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}
function fontStyle() {
	let file_content = fs.readFileSync(srcFolder + '/scss/config/_fonts.scss');
	if (file_content == '') {
		fs.writeFile(srcFolder + '/scss/config/_fonts.scss', '', cb);
		fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname !== fontname) {
						fs.appendFile(
							srcFolder + '/scss/config/_fonts.scss',
							'@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n',
							cb
						);
					}
					c_fontname = fontname;
				}
			}
		});
	}
	return src(path.src.html);
}
// Сброка вебпаком JS и CSS файлов
function webpackBuild() {
	return src(path.src.js, {})
		.pipe(
			webpack({
				config: webPackConfig
			})
		)
		.pipe(dest(path.build.js));
}

function libs() {
	return src(path.src.libs, {}).pipe(dest(path.build.libs));
}

function js() {
	return src(path.src.js, {}).pipe(dest(path.build.js));
}

function others() {
	return src(path.src.others, {}).pipe(dest(path.build.others));
}

function copyScss() {
	return src(path.src.scss, {}).pipe(dest(path.build.scss));
}

function copyHTMLTemplates() {
	return src(path.src.tpl, {}).pipe(dest(path.build.tpl));
}

// Картинки
function imagesBuild() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(
			imagemin([
				webp({
					quality: 85
				})
			])
		)
		.pipe(rename({ extname: '.webp' }))
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(newer(path.build.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.images))
		.pipe(src(path.src.svg))
		.pipe(newer(path.build.images))
		.pipe(dest(path.build.images));
}
// Дополнительные действия для CSS файла
function cssBuild() {
	return src(`${projectName}/css/style.css`, {})
		.pipe(plumber())
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)
		.pipe(
			webpcss({
				webpClass: '.webp',
				noWebpClass: '.no-webp'
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(path.build.css));
}
// Сборка галпом HTML файлов
function htmlBuild() {
	return src(`${projectName}/*.html`, {}).pipe(webphtml()).pipe(dest(path.build.html));
}

// Картинки без webp
function imagesNoWebpBuild() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.images))
		.pipe(src(path.src.svg))
		.pipe(newer(path.build.images))
		.pipe(dest(path.build.images));
}
// Дополнительные действия для CSS файла без webp
function cssNoWebpBuild() {
	return src(`${projectName}/css/style.css`, {})
		.pipe(plumber())
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(path.build.css));
}
// Сборка галпом HTML файлов без webp
function htmlNoWebpBuild() {
	return src(`${projectName}/*.html`, {}).pipe(dest(path.build.html));
}

let fontsBuild = gulp.series(fontsConverter, fontStyle);
let dev = gulp.series(clean, gulp.parallel(addGitIgnore, fontsBuild, others, libs, js));
let build = gulp.series(
	clean,
	gulp.parallel(
		addGitIgnore,
		fontsBuild,
		imagesBuild,
		libs,
		js,
		others,
		copyScss,
		copyHTMLTemplates
	),
	webpackBuild,
	cssBuild,
	htmlBuild
);
let devbuild = gulp.series(
	clean,
	gulp.parallel(
		addGitIgnore,
		fontsBuild,
		imagesNoWebpBuild,
		libs,
		js,
		others,
		copyScss,
		copyHTMLTemplates
	),
	webpackBuild,
	cssNoWebpBuild,
	htmlNoWebpBuild
);

gulp.task('fonts', fontsBuild);
gulp.task('default', dev);
gulp.task('build', build);
gulp.task('devbuild', devbuild);
