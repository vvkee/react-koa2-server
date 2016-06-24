'use strict';
import gulp from 'gulp'
import runSequence from 'gulp-sequence'

import { pathConfig } from '../config'
import path from 'path'

const rootPath = path.join(process.cwd(), '..')
const srcPath = path.join(rootPath, pathConfig.src)
const distPath = path.join(rootPath, pathConfig.dist)

import task from './task'

task({
    gulp: gulp,
    path: {
        src: srcPath,
        dist: distPath,
        root: rootPath
    }
})

gulp.task('dev', (cb) => {
    runSequence('clean',['output', 'fronted', 'watch'], ['webpack_dev', 'server'], cb)
})
export default gulp
