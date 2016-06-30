import fs from 'fs'
import path from 'path'
import _ from 'lodash'
const mapFilePath = path.resolve(__dirname, '../public/map.json')
function readStaticMap (app) {
    app.context.renderStaticFile = async pageName => {
        pageName = pageName || 'index'
        let fileData = null
        let dependentMap = null
        let jsOutput = []
        let cssOutput = []

        try {
            fileData = await readFile()
        } catch (e) {
            app.context.throw('读取文件失败，请检查权限或文件是否存在！', 500)
        }
        try {
            dependentMap = JSON.parse(fileData)
        } catch (e) {
            app.context.throw(`转换失败，请检查${mapFilePath}内容格式`, 500)
        }

        if (dependentMap[pageName] && dependentMap[pageName]) {
            jsOutput.push(getOutput("common", "js", dependentMap))
            jsOutput.push(getOutput("vendor", "js", dependentMap))
            jsOutput.push(getOutput(pageName, "js", dependentMap))
        }
        if (dependentMap[pageName] && dependentMap[pageName] && dependentMap[pageName]['css']) {
            cssOutput.push(getOutput(pageName, "css", dependentMap))
        }
        return {
            js: jsOutput,
            css: cssOutput
        }
    }
}
function getOutput (pageName, fileType, map) {
    let output = ''
    switch (fileType) {
        case 'js':
            output = map[pageName].js
            break;
        case 'css':
            output = map[pageName].css
            break;
    }
    return output
}
// 读取文件
function readFile () {
    return new Promise((resolve, reject) => {
        const file = fs.readFile(mapFilePath, {
            encoding: 'utf-8'
        }, (err, data) => {
            if (err) reject('读取文件失败，请检查权限或文件是否存在！')
            else resolve(data)
        })
    })

}

export default readStaticMap
