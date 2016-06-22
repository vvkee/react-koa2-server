import eslint from 'gulp-eslint'
import eslint_formatter from 'eslint-friendly-formatter'

export default (gulp, path) => {
    gulp.task('output', () => {
        return gulp.src(path.src + '/**/*.?(js|jsx)')
            .pipe(eslint())
            .pipe(eslint.format(eslint_formatter))
            .pipe(gulp.dest(path.dist))
    })
}
