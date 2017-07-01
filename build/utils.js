var path = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: function(dir) {
    return path.join(__dirname, '..', dir);
  },
  assetsPath: function (_path) {
    var assetsPath = process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
    return path.posix.join(assetsPath, _path);
  },
  cssRules: function(){
    var isProd = process.env.NODE_ENV === 'production';
    var uses = [
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader' // postprocesses CSS
      },
      {
        loader: 'resolve-url-loader' // resolves relative paths based on the original source file.
      },
      {
        loader: 'sass-loader', // compiles Sass to CSS
        options: {
          sourceMap: true
        }
      }
    ]
    if (!isProd) {
      uses.unshift({
        loader: 'style-loader' // creates style nodes from JS strings
      });
    }
    return {
      test: /(\.scss|\.css)$/,
      use: ExtractTextPlugin.extract({
        use: uses
      })
    }
  }
};
