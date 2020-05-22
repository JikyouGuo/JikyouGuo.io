// 引入gulp
var gulp = require('gulp');

// gulp中插件的使用: npm下载 --> 获取插件 --> 使用
// 获取:
// minify: html
var htmlClean = require('gulp-htmlclean');
// minify: 图片
var imageMin = require('gulp-imagemin');
// minify: js
var uglify = require('gulp-uglify');
// minify: js中调试语句
var stripDebug = require('gulp-strip-debug');
// less ==> css
var less = require('gulp-less');
// minify: css
var cleanCss = require('gulp-clean-css');
// postcss  autoprefixer: 补全兼容性
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// 服务器
var connect = require('gulp-connect');

// 获取环境参数(production/development)
var devMod = process.env.NODE_ENV === 'development';
console.log(devMod);
// 设置环境变量
// export NODE_ENV=development

// 配置输出路径 -> task
var folder = {
  src: './src/',
  dist: './dist/'
};

// 流操作:
// 添加任务: 输出到dist的html, css, js
// html
gulp.task('html', function() {
  return gulp
    .src(folder.src + 'html/*')
    .pipe(connect.reload()) // 改动时刷新(服务器)
    .pipe(htmlClean())
    .pipe(gulp.dest(folder.dist + 'html/'));
});
// css
gulp.task('css', function() {
  return gulp
    .src(folder.src + 'css/*')
    .pipe(connect.reload()) // 改动时刷新(服务器)
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest(folder.dist + 'css/'));
});
// js
gulp.task('js', function() {
  return gulp
    .src(folder.src + 'js/*')
    .pipe(connect.reload()) // 改动时刷新(服务器)
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(folder.dist + 'js/'));
});
// image
gulp.task('image', function() {
  return gulp
    .src(folder.src + 'images/*')
    .pipe(imageMin())
    .pipe(gulp.dest(folder.dist + 'images/'));
});
// server
gulp.task('server', function() {
  connect.server({
    root: 'dist',
    port: '1234',
    livereload: true,
    index: 'html/index.html'
  });
});

// 监听文件改动 --> 执行任务(para2)
gulp.task('watch', function() {
  gulp.watch(folder.src + 'html/*', gulp.series('html'));
  gulp.watch(folder.src + 'css/*', gulp.series('css'));
  gulp.watch(folder.src + 'js/*', gulp.series('js'));
});

// 默认任务
gulp.task('default', gulp.parallel('html', 'css', 'js', 'image', 'server', 'watch'));
