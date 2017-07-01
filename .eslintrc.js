module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "env": {
    'browser': true
  },
  "rules": {
    "no-param-reassign": 0,
    "class-methods-use-this": 0,
    "no-console": 0,
    "comma-dangle": [2, "never"],
    "max-len": [0],
    "arrow-body-style": ["error", "as-needed"]
  },
  settings: {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.conf.js"
      }
    }
  },
  globals: {
    'webpackGlobal': true
  }
};