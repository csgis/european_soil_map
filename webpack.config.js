let path = require('path');
let webpack = require('webpack');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  let plugins = [new CopyWebpackPlugin([
    { from: 'src/index.html' },
    { from: 'src/loading.svg' },
    { from: 'README.md' },
    { from: 'package.json' }
  ]), new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })];

  let PROD = env && env.production;
  if (PROD) {
    plugins.push(new UglifyJSPlugin());
  }

  return {
    entry: './src/main.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: './bundle.js',
      libraryTarget: 'var',
      library: 'App'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [{
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }]
      }, {
        test: /app\.json/,
        use: [{
          loader: '@csgis/json-modules-loader',
          options: {
            importName: 'bricjs'
          }
        }, {
          loader: '@csgis/json-module-args-loader',
          options: {
            args: 'deps',
            skip: 1
          }
        }]
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }],
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      }]
    },
    plugins
  };
};
