var path = require('path');

module.exports = {
  build: {
    env: {
        NODE_ENV: '"production"'
    },
    distPath: path.resolve(__dirname, '../dist'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsSubDirectory: '',
    assetsPublicPath: '/'
  },
  dev: {
    env: {
        NODE_ENV: '"development"'
    },
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    autoOpenBrowser: true,
    port: 8000
  }
}
