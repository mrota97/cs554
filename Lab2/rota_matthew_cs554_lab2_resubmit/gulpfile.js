const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");
const pug = require("gulp-pug");

//"./src/styles/bootstrap/scss/_variables.scss"

const sassFiles = [
  "./src/styles/bootstrap/scss/bootstrap.scss",
  "./src/styles/variables.scss",
  "./src/styles/custom.scss"
];

const vendorJsFiles = [
  "./node_modules/jquery/dist/jquery.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.js"
];

const pugFiles = [
  "./views/*.pug"
];

gulp.task('sass', function(done) {
  gulp
    .src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate("styles.css"))
    .pipe(gulp.dest("./public/css/"))
    .pipe(
      autoPrefix({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./public/css/"));
  done();
  });
  
gulp.task('js:vendor', function(done) {
  gulp
    .src(vendorJsFiles)
    .pipe(concatenate("vendor.min.js"))
    .pipe(gulp.dest("./public/js/"));
  done();
  });

gulp.task('views', function(done) {
  gulp
    .src(pugFiles)
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(gulp.dest('./public'));
  done();
});

gulp.task("build", gulp.parallel(["sass","js:vendor"]))

  gulp.task('watch', function(done) {
    gulp.watch(sassFiles, gulp.series('sass'));
    gulp.watch(vendorJsFiles, gulp.series('js:vendor'));
    gulp.watch(pugFiles, gulp.series('views'));
    done();
  });

  gulp.task('default', gulp.series('watch'));
