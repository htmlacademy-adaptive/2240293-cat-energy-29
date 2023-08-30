import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-squoosh';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//Html
export const html = () => {
  return gulp.src('sourse/*.html')
.pipe(htmlmin({ collapseWhitespace: true }))
.pipe(gulp.dest('build'))

}

//Scripts
export const script = () => {
  return gulp.src('sourse/js/*.js')
  .pipe(terser)
  .pipe(gulp.dest('build/js'))
}
//Images
export const images = () => {
  return gulp.src('sourse/img/**/*.{jpeg,png}')
  .pipe(squoosh)
  .pipe(gulp.dest('build/img'))
}

//WebP

//Svg


// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  html,styles, server, watcher
);
