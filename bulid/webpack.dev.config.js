import _ from 'lodash'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config'

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const entriesFromBaseConfig = baseConfig.entry
const chunks = getChunksByEntry(entriesFromBaseConfig)
export default merge(baseConfig, {
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
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
