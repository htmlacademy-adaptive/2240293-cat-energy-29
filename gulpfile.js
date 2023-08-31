import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import del from 'del';
import browser from 'browser-sync';

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
  return gulp.src('sourсe/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//Scripts
export const script = () => {
  return gulp.src('sourсe/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

//Images

export const optimizeImages = () => {
  return gulp.src('sourсe/img/**/*.{jpeg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

export const copyImages = () => {
  return gulp.src('sourсe/img/**/*.{jpeg,png}')
    .pipe(gulp.dest('build/img'));
}

//WebP
export const creatWebp = () => {
  return gulp.src('sourсe/img/**/*.{jpeg,png}')
    .pipe(squoosh ({
      webp:{}
    }))
    .pipe(gulp.dest('build/img'));
}
//Svg
export const svg = () => {
  return gulp.src(['sourсe/img/**/*.svg','!sourсe/img/icon/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

//Sprite

export const sprite = () => {
  return gulp.src('sourсe/img/icon/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

//Fonts

export const copy = (done) => {
  gulp.src([
    'sourсe/fonts/*.{woff2,woff}',
    'sourсe/*.ico',
    'sourсe/img/favicons/*.webmanifest'
  ], {
    base: 'sourсe'
  })
    .pipe(gulp.dest('build'))
  done();
}

//Clean
export const clean = () => {
  return del('build');
}

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

// Relood

const reload = (done) => {
  browser.reload();
  done();
}
// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(script));
  gulp.watch('source/*.html', gulp.series(html, reload));
}



//Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    script,
    svg,
    sprite,
    creatWebp
  ),
);

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    script,
    svg,
    sprite,
    creatWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
