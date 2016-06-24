import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'

import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import glob from 'glob'

const rootPath = path.join(__dirname, '..')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const entries = getEntry()
const chunks = getChunksByEntry(entries)

export default  {
    entry: entries,
    output: {
        path: `${rootPath}/dist/public/`,
        filename: 'js/[name].js',
        chunkFilename: 'js/[chunkhash:8].chunk.js',
        hotUpdateChunkFilename: 'js/[id].[hash].hot-update.js'
    },
    resolve: {
        root: [rootPath + '/src', rootPath + '/node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'eslint',
            include: rootPath,
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.jsx$/,
            loader: 'jsx-loader',
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: [
                    require.resolve('babel-preset-es2015'),
                    require.resolve('babel-preset-react'),
                    require.resolve('babel-preset-stage-3')
                ]
            }
        }, {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: [
                'image?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
                // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                // 否则则调用file-loader，参数直接传入
                'url?limit=10000&name=img/[hash:8].[name].[ext]',
            ],
            query: {
                limit: 10000,
                name: 'images/[hash:7].[name].[ext]'
            }
        }, {
            test: /\.(svg|woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'fonts/[hash:7].[name].[ext]'
            }
        }]
    },
    plugins: [
        // common file
        new CommonsChunkPlugin({
             name: 'vender',
             chunks: chunks
        }),
        // create map.json
        new AssetsPlugin({
            filename: `map.${new Date().getTime()}.json`,
            update: true,
            prettyPrint: true,
            fullPath: true,
            path: `${rootPath}/dist/public/`
        })
    ],
    eslint: {
        formatter: require('eslint-friendly-formatter')
    }
}

// 获取所有的view页面路径
function getEntry () {
    const viewsPath = path.resolve(rootPath, 'src/views')
    const entryPath = path.resolve(rootPath, 'src/public/js/entries')

    const pagesFiles = glob.sync(`${viewsPath}/*.jsx`)
    const entryFiles = glob.sync(`${entryPath}/*.js`)

    let map = {}
    pagesFiles.forEach(pagePath => {
        let pageFileName = pagePath.substring(pagePath.lastIndexOf('\/') + 1, pagePath.lastIndexOf('.'))
        entryFiles.forEach(function(entryPath) {
            let entryFileName = entryPath.substring(entryPath.lastIndexOf('\/') + 1, entryPath.lastIndexOf('.'))
            if (pageFileName === entryFileName) {
                map[pageFileName] = entryPath
            }
        })
    })

    return Object.assign(map, {
        vender: ['react', 'react-dom']
    })
}

//.DS_Store
function getChunksByEntry (entries) {
    let chunks = []
    _.forEach(entries, (entry, keyName) => {
        if (keyName !== 'vender') {
            chunks.push(keyName)
        }
    })
    return chunks
}
