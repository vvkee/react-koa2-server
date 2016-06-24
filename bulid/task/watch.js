export default (gulp, path) => {
    gulp.task('watch', () => {
        let watcher = gulp.watch(path.src + '/**/*', ['output'])
    })
}
