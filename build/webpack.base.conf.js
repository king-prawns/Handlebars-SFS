var path = require('path');
var webpack = require('webpack');
var utils = require('./utils');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

process.noDeprecation = true;

module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'Components': path.resolve(__dirname, '../src/components'),
      '@': utils.resolve('src'),
      'webpackGlobal': path.resolve(__dirname, './global')
    }
  },
  module: {
    rules: [
      { 
        test: /\.hbs$/, 
        loader: 'handlebars-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            plugins: ['transform-runtime'],
            presets: ['es2015']
        },
        include: [utils.resolve('src')]
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [utils.resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'webpackGlobal': 'webpackGlobal'
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: '**/*.scss',
      failOnError: false
    })
  ]
}
