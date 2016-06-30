import _ from 'lodash'
import webpack from 'webpack'
import merge from 'webpack-merge'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import QiniuPlugin from 'qiniu-webpack-plugin'
import baseConfig from './webpack.base.config'
import { cssModuleConfig } from './config'

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const entriesFromBaseConfig = baseConfig.entry
const chunks = getChunksByEntry(entriesFromBaseConfig)

const extractCSS = new ExtractTextPlugin('css/[contenthash:8].[name].min.css', {
    // 当allChunks指定为false时，css loader必须指定怎么处理
    // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
    // 第一个参数`notExtractLoader`，一般是使用style-loader
    // @see https://github.com/webpack/extract-text-webpack-plugin
    allChunks: false
})
const cssLoader = extractCSS.extract('style', `css?minimize&modules&importLoaders=1&localIdentName=${cssModuleConfig}!postcss-loader`)
const lessLoader = extractCSS.extract('style', `css?minimize&modules&importLoaders=1&localIdentName=${cssModuleConfig}!less-loader!postcss-loader`)
export default merge(baseConfig, {
    output: {
        filename: 'js/[name].[hash].min.js',
        chunkFilename: 'js/chunk.[hash.]min.js',
        hotUpdateChunkFilename: 'js/[id].[hash].min.js',
        publicPath: 'http://7xnqtq.com1.z0.glb.clouddn.com/static/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: cssLoader
            }, {
                test: /\.less$/,
                loader: lessLoader
            }
        ]
    },
    plugins: [
        extractCSS,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new QiniuPlugin({
            ACCESS_KEY: 'ZdTWWI6pGAuZmEi_7stJrAFSL64YGFOjhpZPezIb',
            SECRET_KEY: 'LWubCkQLzScOW_IrAQN2nks-on_7aQm8E7CkKtG7',
            bucket: 'static',
            path: 'static'
        }),
        new CommonsChunkPlugin({
             name: 'common',
             filename: 'js/common.[hash].js',
             chunks: chunks
        })
    ]
})

// getChunksByEntry
function getChunksByEntry (entries) {
    let chunks = []
    _.forEach(entries, (entry, keyName) => {
        chunks.push(keyName)
    })
    return chunks
}
