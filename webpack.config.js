const SentryCliPlugin = require('@sentry/webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack')

const package = require('./package.json');
const sentryRelease = `${package.name}${package.version}`;

const main = {
  mode: 'development',
  devtool: 'source-map',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
	},
  plugins: [
    new SentryCliPlugin({
			release: sentryRelease,
      include: './dist',
      ignore: ['node_modules', 'webpack.config.js'],
    })
  ] 
}

const renderer = {
  mode: 'development',
  devtool: 'source-map',
  target: 'electron-renderer',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    renderer: './renderer.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'renderer.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
		}),
		new SentryCliPlugin({
			release: sentryRelease,
			include: './dist',
			ignore: ['node_modules', 'webpack.config.js'],
		})
  ]
}

module.exports = [ main, renderer ]
