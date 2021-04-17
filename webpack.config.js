const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output:{
		path: __dirname + '/dist',
		filename: 'bundle.[hash].js'
	},
	module: {
	  rules: [
         {
           test: /\.(js)$/,
           exclude: /node_modules/,
           use: ['babel-loader']
         },
         {
           test: /\.css$/,
           use: [
             {
               loader: 'style-loader'
             },
             {
               loader: 'css-loader',
             }
           ]
         }
      ]
    },
	plugins: [
	  new HtmlWebpackPlugin({
        template: 'public/index.html',
      })
    ],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		host: "0.0.0.0",
		port: 9000,
		open: true,
		historyApiFallback: true,
	}
};
