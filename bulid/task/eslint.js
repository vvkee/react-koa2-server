import eslint from 'gulp-eslint'
import eslint_formatter from 'eslint-friendly-formatter'
import runSequence from 'gulp-sequence'

export default (gulp, path) => {
    gulp.task('eslint', () => {
        return gulp.src([
            `${path.root}/!(public|static|bulid)/**/*.?(js|jsx)`,
            `${path.root}/app.?(js|jsx)`,
        ]).pipe(eslint())
          .pipe(eslint.format(eslint_formatter))
    })
}
