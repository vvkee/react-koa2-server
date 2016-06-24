'use strict';
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config'

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
    }
})
