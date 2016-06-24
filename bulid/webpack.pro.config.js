'use strict';
import webpack from 'webpack'
import merge from 'webpack-merge'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import baseConfig from './webpack.base.config'

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
export default merge(baseConfig, {
    output: {
        filename: 'js/[name].[hash].min.js',
        chunkFilename: 'js/chunk.[hash.]min.js',
        hotUpdateChunkFilename: 'js/[id].[hash].min.js',
        publicPath: 'http://static.weizongqi.com/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize','less')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[contenthash:8].[name].min.css', {
            // 当allChunks指定为false时，css loader必须指定怎么处理
            // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
            // 第一个参数`notExtractLoader`，一般是使用style-loader
            // @see https://github.com/webpack/extract-text-webpack-plugin
            allChunks: false
        }),
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
        new webpack.optimize.OccurenceOrderPlugin()
    ]
})
