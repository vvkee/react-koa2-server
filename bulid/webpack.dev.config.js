import _ from 'lodash'
import webpack from 'webpack'
import merge from 'webpack-merge'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import baseConfig from './webpack.base.config'

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const entriesFromBaseConfig = baseConfig.entry
const chunks = getChunksByEntry(entriesFromBaseConfig)

import { cssModuleConfig } from './config'

const extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
const cssLoader = extractCSS.extract('style-loader?sourceMap', `css-loader?modules&importLoaders=1&localIdentName=${cssModuleConfig}!postcss-loader`)
const lessLoader = extractCSS.extract('style-loader?sourceMap', `css-loader?modules&importLoaders=1&localIdentName=${cssModuleConfig}!less-loader!postcss-loader`)
export default merge(baseConfig, {
    devtool: '#eval-source-map',
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
        new CommonsChunkPlugin({
             name: 'common',
             filename: 'js/common.js',
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
