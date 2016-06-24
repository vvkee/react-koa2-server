export default (gulp, path) => {
    gulp.task('fronted', () => {
        return gulp.src(path.src + '/public/**/*')
            .pipe(gulp.dest(path.dist + '/fronted/'))
    })
}
