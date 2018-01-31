var webpack = require('webpack');

module.exports = {
	entry: {
		oj3: [
			'babel-polyfill',
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			'./index.js'
		]
	},
	output: {
		path: __dirname,
		filename: 'oj3.js',
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
				loaders: ['react-hot', 'babel'],
				include: [__dirname] 
			}
		]
	},
	plugins: [
  		new webpack.HotModuleReplacementPlugin(),
  		new webpack.NoErrorsPlugin()
  	]
};