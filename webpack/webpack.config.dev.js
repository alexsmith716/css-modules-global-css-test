
const webpack  = require('webpack');
const path  = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const rootPath = path.resolve(__dirname, '..');

module.exports = {

  mode: 'development',

  context: rootPath,

  devtool: 'inline-source-map',

  entry: {
    main: [
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
    filename: '[name]-[hash].js',
    publicPath: '/',
    // path: path.resolve(__dirname, '../public/assets'),
    // // the target directory for all output files - absolute path
    // publicPath: '/assets/',
    // // the url to the output directory resolved relative to the HTML page
    // filename: '[name].[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },

  // optimization: {
  //   splitChunks: {
  //     automaticNameDelimiter: "-",
  //     chunks: 'all',
  //     minSize: 0,
  //   },
  // },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   },
  // },

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
      // {
      //   test: /\.(scss)$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         localIdentName: '[name]__[local]__[hash:base64:5]',
      //         //importLoaders: 2,
      //         //sourceMap: true
      //       }
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true,
      //       }
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: true,
      //       }
      //     },
      //   ]
      // },
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
      // {
      //   test: /\.(css)$/,
      //   use:
      //   [{
      //     loader: 'style-loader'
      //   },
      //   {
      //     loader : 'css-loader',
      //     options:
      //     {
      //       importLoaders : 1,
      //       sourceMap     : true
      //     }
      //   },
      //   {
      //     loader : 'postcss-loader'
      //   }]
      // },
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
    extensions: ['.js', '.jsx'],
    modules: [ 'src', 'node_modules', ],
  },
  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV  : JSON.stringify('development'),
        // BABEL_ENV : JSON.stringify('development')
      },
      REDUX_DEVTOOLS : true,
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),

    new webpack.NamedModulesPlugin(),

    new MiniCssExtractPlugin({
      filename: 'styles.css',
      // filename: '[name].css',
      // chunkFilename: '[name]-[contenthash].js'
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
    hot: true,
    dev: {
      // https://github.com/webpack-contrib/webpack-serve/issues/95
      publicPath: '/',
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  }

};

// =================================================================================================
// =================================================================================================
// =================================================================================================


// "[hash]":
// ------------------------------------------------------------------------------------------
//   * Returns the build hash. If any portion of the build changes, this changes as well (Cache invalidation).
// 


// "[chunkhash]":
// ------------------------------------------------------------------------------------------
//   * Returns an entry chunk-specific hash. 
//   * Each 'entry' defined in the configuration receives a hash of its own. 
//   * If any portion of the entry changes, the hash will change as well (Cache invalidation). 
//   * "[chunkhash]" is more granular than "[hash]" by definition.


//  * If the file contents related to a chunk are different, the hash changes as well, thus the cache gets invalidated.
//  * More accurately, the browser sends a new request for the new file. 
//  * If only `main` bundle gets updated, only that file needs to be requested again.


//  Adding Hashes to Filenames (Enable Long Term Caching)
//  -----------------------------------------------------------------------------------------

//    * hash          >>>>  entry.output.filename
//    * chunkhash     >>>>  entry.output.chunkFilename
//    * contenthash   >>>>  plugins.push(new webpack.MiniCssExtractPlugin({filename: 'styles.css',}))


// =================================================================================================
// =================================================================================================
// =================================================================================================


//  ## Conclusion


//  # Minification >>>>>> make the build smaller:

//  * **Minification** process analyzes your source code and turns it into a smaller form with the same meaning if you use safe transformations. Specific unsafe // transformations allow you to reach even smaller results while potentially breaking code that relies, for example, on exact parameter naming.
//  * Webpack performs minification in production mode using UglifyJS by default. Other solutions, such as *babel-minify-webpack-plugin*, provide similar functionality //  with costs of their own.
//  * Besides JavaScript, it's possible to minify other assets, such as CSS, HTML, and images, too. Minifying these requires specific technologies that have to be // applied through loaders and plugins of their own.

//  =======================================================

//  ## Speeding Up JavaScript Execution

//  Specific solutions allow you to preprocess code so that it will run faster. They complement the minification technique and can be split into **scope hoisting**, **// pre-evaluation**, and **improving parsing**. It's possible these techniques grow overall bundle size sometimes while allowing faster execution.

//  ### Scope Hoisting

//  Since webpack 4, it applies scope hoisting in production mode by default. It hoists all modules to a single scope instead of writing a separate closure for each. //  Doing this slows down the build but gives you bundles that are faster to execute. [Read more about scope hoisting](https://medium.com/webpack///  brief-introduction-to-scope-hoisting-in-webpack-8435084c171f) at the webpack blog.

//  T>  Pass `--display-optimization-bailout` flag to webpack to gain debugging information related to hoisting results.

//  ### Pre-evaluation

//  [prepack-webpack-plugin](https://www.npmjs.com/package/prepack-webpack-plugin) uses [Prepack](https://prepack.io/), a partial JavaScript evaluator. It rewrites //  computations that can be done compile-time and therefore speeds up code execution. See also [val-loader](https://www.npmjs.com/package/val-loader) and [//  babel-plugin-preval](https://www.npmjs.com/package/babel-plugin-preval) for alternative solutions.

//  ### Improving Parsing

//  [optimize-js-plugin](https://www.npmjs.com/package/optimize-js-plugin) complements the other solutions by wrapping eager functions, and it enhances the way your // JavaScript code gets parsed initially. The plugin relies on [optimize-js](https://github.com/nolanlawson/optimize-js) by Nolan Lawson.


//  =======================================================
//  =======================================================


//  # Tree Shaking

//  **Tree shaking** is a feature enabled by the ES2015 module definition. The idea is that given it's possible to analyze the module definition statically without //  running it, webpack can tell which parts of the code are being used and which are not. It's possible to verify this behavior by expanding the application and //  adding code there that should be eliminated.

//  * **Tree shaking** drops unused pieces of code based on static code analysis. Webpack performs this process for you as it traverses the dependency graph.
//  * To benefit from tree shaking, you have to use ES2015 module definition.
//  * As a package author, you can provide a version of your package that contains ES2015 modules, while the rest has been transpiled to ES5.


//  =======================================================
//  =======================================================


//  # Environment Variables

//  Sometimes a part of your code should execute only during development. Or you could have experimental features in your build that are not ready for production yet. // Controlling **environment variables** becomes valuable as you can toggle functionality using them.

//  Webpack's `DefinePlugin` enables replacing **free variables** so that you can convert `if (process.env.NODE_ENV === "development")` kind of code to `if (true)` or // `if (false)` depending on the environment.

//  You can find packages that rely on this behavior. React is perhaps the most known example of an early adopter of the technique. Using `DefinePlugin` can bring down //  the size of your React production build somewhat as a result, and you can see a similar effect with other packages as well.

//  Webpack 4 sets `process.env.NODE_ENV` based on the given mode.

//  Setting environment variables is a technique that allows you to control which paths of the source are included in the build.

//  To recap:

//  * Webpack allows you to set **environment variables** through `DefinePlugin` and `EnvironmentPlugin`. Latter maps the system level environment variables to the //  source.
//  * `DefinePlugin` operates based on **free variables** and it replaces them as webpack analyzes the source code. You can achieve similar results by using Babel // plugins.
//  * Given minifiers eliminate dead code, using the plugins allows you to remove the code from the resulting build.
//  * The plugins enable module level patterns. By implementing a wrapper, you can choose which file webpack includes to the resulting build.


//  =======================================================
//  =======================================================



//  # Adding Hashes to Filenames (Enable Long Term Caching)

//    * hash          >>>>  entry.output.filename
//    * Chunkhash     >>>>  entry.output.chunkFilename
//    * contenthash   >>>>  plugins.push(new webpack.MiniCssExtractPlugin({filename: 'styles.css',}))

//  Adding Hashes to Filenames allows the client to leverage caching by indicating whether or not a file has changed. Cache invalidation can be achieved by including a //  hash to the filenames.

//  ## Placeholders

//  Webpack provides **placeholders** for the purpose of client Cache invalidation. These strings are used to attach specific information to webpack output. The most //  valuable ones are:



//  * `[id]` - Returns the chunk id.

//  * `[path]` - Returns the file path.

//  * `[name]` - Returns the file name.

//  * `[ext]` - Returns the extension. `[ext]` works for most available fields. `ExtractTextPlugin` is a notable exception to this rule.

//  * `[hash]` - Returns the build hash. If any portion of the build changes, this changes as well.

//  * `[chunkhash]` - Returns an entry chunk-specific hash. Each `entry` defined in the configuration receives a hash of its own. If any portion of the entry changes, // the hash will change as well. `[chunkhash]` is more granular than `[hash]` by definition.

//  * `[contenthash]` - Returns a hash specific to content. 

//  * `[contenthash]` is available for `ExtractTextPlugin` only and is the most specific option available.

//  * `[contenthash]` is available for `MiniCssExtractPlugin` only and is the most specific option available.


//  It's preferable to use particularly `hash` and `chunkhash` only for production purposes as hashing doesn't do much good during development.



//  ### Example Placeholders


//  Assume you have the following configuration:

//    * entry.output.filename = filename: "[name].[chunkhash].js";


//  Webpack would generate filenames like these based on it:

//    * main.d587bbd6e38337f5accd.js
//    * vendor.dc746a5db4ed650296e1.js


//  ## Setting Up Hashing

//  The build needs tweaking to generate proper hashes. 
//  Images and fonts should receive `hash` while chunks should use `chunkhash` in their names to invalidate them correctly:

//  W> `[hash]` is defined differently for *file-loader* than for the rest of webpack. 
//  It's calculated based on file **content**. 
//  See [file-loader documentation](https://www.npmjs.com/package/file-loader#placeholders) for further information.

//  -------------------------------------------------------------------------------

//  If you used `chunkhash` for the extracted CSS as well, this would lead to problems as the code points to the CSS through JavaScript bringing it to the same entry. 
//  That means if the application code or CSS changed, it would invalidate both.

//  Therefore, instead of `chunkhash`, you can use `contenthash` that is generated based on the extracted content:


// # Separating a Manifest

// When webpack writes bundles, it maintains a **manifest** as well. You can find it in the generated *vendor* bundle in this project. The manifest describes what files webpack should load. It's possible to extract it and start loading the files of the project faster instead of having to wait for the *vendor* bundle to be loaded.

// If the hashes webpack generates change, then the manifest changes as well. As a result, the contents of the vendor bundle change, and become invalidated. The problem can be eliminated by extracting the manifest to a file of its own or by writing it inline to the *index.html* of the project.


// # Performance

// Webpack's performance out of the box is often enough for small projects. That said, it begins to hit limits as your project grows in scale. It's a frequent topic in webpack's issue tracker. [Issue 1905](https://github.com/webpack/webpack/issues/1905) is a good example.

// There are a couple of ground rules when it comes to optimization:

// 1. Know what to optimize.
// 2. Perform fast to implement tweaks first.
// 3. Perform more involved tweaks after.
// 4. Measure impact.


// ## High-Level Optimizations

// Webpack uses only a single instance by default meaning you aren't able to benefit from a multi-core processor without extra effort. This where third-party solutions, such as [parallel-webpack](https://www.npmjs.com/package/parallel-webpack) and [HappyPack](https://www.npmjs.com/package/happypack) come in.




//  =================================================================================================
//  =================================================================================================
//  =================================================================================================


//  Hash:
//  ---------------------------------------------------------------------
//  
//    * name.[hash].js >>>>>>>>>>> changes all chunks on every build
//    * Hash is corresponding to the build. 
//    * Each chunk will get same hash across the build. 
//    * If anything changes in the build, corresponding hash also changes.


//  Chunkhash:
//  ---------------------------------------------------------------------

//    * name.[chunkhash].js >>>>>>>>>> changes hash of only that chunk for which there is corrosponding change in webpack entry
//    * Chunkhash is based on webpack entry point.
//    * Each entry defined will have it’s own hash.
//    * If anything changes for that particular entry point then only corresponding hash changes.


//  Contenthash:
//  ---------------------------------------------------------------------

//    * Contenthash is specfic type of hash created in ExtractTextPlugin
//    * it is calculated by extracted content not by full chunk content


//  Caching:
//  ---------------------------------------------------------------------
//  
//    * Cache invalidation () can be achieved by including a hash to filenames.


//  NamedModulesPlugin:
//  ---------------------------------------------------------------------

//    * allows webpack to use relative path instead of incremental id for naming modules


//  "https://webpack.js.org/guides/caching/" :
//  ---------------------------------------------------------------------
//  separate out menifest file from all your chunks




