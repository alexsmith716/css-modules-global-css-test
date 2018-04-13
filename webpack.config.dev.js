var webpack = require('webpack');
var path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var rootPath = path.resolve(__dirname, '.');

module.exports = {

  context: rootPath,

  devtool: 'eval-source-map',

  entry: {
    app: [
      //'./client/assets/scss/global/global.scss',
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'jquery',
      'popper.js',
      'bootstrap',
    ],
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /(global\.css)$/,
        // test: /\.?global.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
          }
        ]
      },
      {
        test: /\.scss$/,
        use: 
          ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }]
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.json$/,
        use: [
          {loader: 'json-loader'}
        ]
      },
      {
        test: '/popper.js/',
        use: [{
          loader: 'expose-loader',
          options: 'popper',
        },{
          loader: 'expose-loader',
          options: 'Popper',
        }]
      },
      {
        test: '/jquery/',
        use: [{
          loader: 'expose-loader',
          options: 'jQuery',
        },{
          loader: 'expose-loader',
          options: '$',
        }]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json',],
    modules: [ 'client', 'node_modules', ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
};
