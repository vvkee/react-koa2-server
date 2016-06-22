import cleanTask from './clean'
import outputTash from './output'

export default (_opt) => {
    const gulp = _opt.gulp
    const path = _opt.path

    // 注册任务
    // 清除文件
    cleanTask(gulp, path)
    //输出文件
    outputTash(gulp, path)

}
