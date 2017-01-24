var webpack = require('webpack');
var path = require('path');

// var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({ path: './' });
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    polyfills: './src/polyfills',
    app: './app/main.ts'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.css'],
    alias: {
      // use proper file (needed to change file to export punycode).
      'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl-dev.js'),
      'mapbox-gl-geocoder': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl-geocoder.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor'] }),
    assetsPluginInstance
  ]
}
