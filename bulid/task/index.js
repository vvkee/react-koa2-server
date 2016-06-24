import cleanTask from './clean'
import outputTash from './output'
import frontedTash from './fronted'
import watchTash from './watch'
import serverTash from './server'
import webpackTash from './webpack'
export default (_opt) => {
    const gulp = _opt.gulp
    const path = _opt.path

    // 注册任务
    // 清除文件
    cleanTask(gulp, path)
    //输出文件
    outputTash(gulp, path)
    // 监听
    watchTash(gulp, path)
    // 启动
    serverTash(gulp, path)
    // webpack任务
    webpackTash(gulp, path)
    // 复制fonted
    frontedTash(gulp, path)
}
