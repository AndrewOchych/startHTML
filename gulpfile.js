// yarn add gulp gulp-kit gulp-sass gulp-clean-css gulp-concat browser-sync gulp-uglify-es gulp-autoprefixer gulp-imagemin gulp-newer del -D

const gulp = require("gulp");
const kit = require("gulp-kit");
const sass = require("gulp-sass");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");

function html() {
  return gulp
    .src("src/html/**/*.kit")
    .pipe(kit())
    .pipe(gulp.dest("dest/"))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("style.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest("dest/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dest/"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src("src/img/**/*")
    .pipe(newer("dest/img/"))
    .pipe(imagemin())
    .pipe(gulp.dest("dest/img/"));
}

function cleanimg() {
  return del("dest/img/**/*", { force: true });
}

function fonts() {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("dest/fonts/"));
}

function cleanfonts() {
  return del("dest/fonts/**/*", { force: true });
}

function clean() {
  return del("dest/", { force: true });
}

function browsersync() {
  browserSync.init({
    server: { baseDir: "dest/" },
    notify: false,
  });
}

function startwatch() {
  gulp.watch("src/html/**/*.kit", html);
  gulp.watch("src/scss/**/*", styles);
  gulp.watch("src/js/*.js", scripts);
  gulp.watch("src/img/**/*", images);
  gulp.watch("dest/*.html").on("change", browserSync.reload);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanimg = cleanimg;
exports.fonts = fonts;
exports.cleanfonts = cleanfonts;
exports.clean = clean;
exports.browsersync = browsersync;
exports.startwatch = startwatch;
exports.assets = gulp.series(
  cleanimg,
  cleanfonts,
  styles,
  scripts,
  images,
  fonts
);
exports.default = gulp.parallel(
  html,
  styles,
  scripts,
  images,
  fonts,
  browsersync,
  startwatch
);
