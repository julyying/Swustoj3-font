var webpack = require('webpack');
// var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'antd', 'axios', 'classnames', 'react-codemirror',
                'react-css-modules', 'react-redux', 'react-router',
                'react-router-redux', 'redux', 'simditor'],
        oj3: [
            'babel-polyfill',
            './index.js'
        ]
    },
    output: {
        // path: __dirname,
        path: '../build',
        filename: 'oj3.pub.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'sass'
                ]
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: ['babel'],
                include: [__dirname] 
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"',
            },
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        // new WebpackMd5Hash(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            comments: false
        })
    ]
};