process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var opn = require('opn');
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var chalk = require('chalk');
var config = require('../config')
var webpackConfig = require('./webpack.dev.conf');

var port = config.dev.port;
var autoOpenBrowser = config.dev.autoOpenBrowser;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  warn: false
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = config.dev.assetsSubDirectory;
app.use(express.static(staticPath));

var uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(function () {
  console.log(chalk.cyan('> Listening at ' + uri + '\n'));
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  if (autoOpenBrowser) {
    opn(uri);
  }
})
