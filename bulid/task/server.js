import nodemon from 'gulp-nodemon'

export default (gulp, path) => {
    gulp.task('server', () => {
        nodemon({
            script: path.root + '/bin/www',
            execMap: {
                "js": "node"
            },
            watch: [
                path.dist + '/app.js',
                path.dist + '/config',
                path.dist + '/controller',
                path.dist + '/middleware',
                path.dist + '/service',
                path.dist + '/util'
            ],
            env: {
                'NODE_ENV': 'development'
            }
        }).on('start', function() {
            gutil.log(gutil.colors.yellow(
                'http://localhost:8837'));
        })
    })
}
