import del from 'del'

export default (gulp, path) => {
    gulp.task('clean', () => {
        del([path.dist])
    })
}
