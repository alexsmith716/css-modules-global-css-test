var webpack = require('webpack');
var path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var rootPath = path.resolve(__dirname, '..');

module.exports = {

  mode: 'development',

  context: rootPath,

  devtool: 'inline-source-map',

  entry: {
    app: [
      'babel-polyfill',
      './src/assets/scss/global/global.scss',
      './src/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'jquery',
      'popper.js',
      'bootstrap',
    ],
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/',
    // path: path.resolve(__dirname, '../public/assets'),
    // // the target directory for all output files - absolute path
    // publicPath: '/assets/',
    // // the url to the output directory resolved relative to the HTML page
    // filename: '[name]-[hash].js',
    // chunkFilename: '[name]-[chunkhash].js',
  },

  // optimization: {
  //   splitChunks: {
  //     automaticNameDelimiter: "-",
  //     chunks: 'all',
  //     minSize: 0,
  //   },
  // },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {

    strictThisContextOnImports: true,

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
      //{
      //  test: /(global\.css)$/,
      //  use: [
      //    {
      //      loader: 'style-loader'
      //    },
      //    {
      //      loader: 'css-loader',
      //      options: {
      //        sourceMap: true
      //      }
      //    },
      //    {
      //      loader: 'postcss-loader',
      //    }
      //  ]
      //},
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              //modules: true,
              //localIdentName: '[name]__[local]__[hash:base64:5]',
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.(css)$/,
        use:
        [{
          loader: 'style-loader'
        },
        {
          loader : 'css-loader',
          options:
          {
            importLoaders : 1,
            sourceMap     : true
          }
        },
        {
          loader : 'postcss-loader'
        }]
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
    modules: [ 'src', 'node_modules', ],
  },
  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV  : JSON.stringify('development'),
        // BABEL_ENV : JSON.stringify('development/client')
      },
      REDUX_DEVTOOLS : true,
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),

    new webpack.NamedModulesPlugin(),

    new MiniCssExtractPlugin({
      filename: "styles.css",
      // filename: "[name].css",
      // chunkFilename: "[id].css"
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../client-development.html',
      // analyzerMode: 'server',
      // analyzerPort: 8888,
      // defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false,
    }),
  ],
  serve: {
    port: 3000,
    dev: {
      // https://github.com/webpack-contrib/webpack-serve/issues/95
      publicPath: '/',
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  }
};
