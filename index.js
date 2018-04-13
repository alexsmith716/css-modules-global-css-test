
require('babel-register')({
  "plugins": [
    [
      "css-modules-transform", {
        "preprocessCss": "./loaders/sassLoader.js",
        "generateScopedName": "[name]_[local]_[hash:base64:5]",
        "extensions": [".scss"]
      }
    ]
  ]
});
require('babel-polyfill');
require('./server/server');
