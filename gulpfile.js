import gulp from "gulp";
const { src, dest, series, watch } = gulp;

import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import cssMinify from "gulp-clean-css";
import jsMinify from "gulp-terser";
import * as sass from "sass";
const scss = gulpSass(sass);

function styles() {
  return src("./frontend/src/styles/**/*.scss")
    .pipe(scss())
    .pipe(autoPrefixer('last 2 versions'))
    .pipe(cssMinify())
    .pipe(dest("./frontend/dist/styles/"));
}
function scripts() {
  return src("./frontend/src/scripts/**/*.js")
    .pipe(jsMinify())
    .pipe(dest("./frontend/dist/scripts/"));
}

function watchTask() {
  watch(
    ["./frontend/src/styles/**/*.scss", "./frontend/src/scripts/**/*.js"],
    series(styles, scripts)
  );
}

export default series(styles, scripts, watchTask);