const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('../common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('../../helpers');

module.exports = merge(common, {
  context: helpers.resolveFromRootPath('src'),
  entry: {
    app: [
      './index.tsx',
    ],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-hot-loader',
      'react-router',
      'whatwg-fetch',
    ],
    appStyles: [
    ],
    vendorStyles: [
    ],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: true,
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
      chunksSortMode: 'manual',
      chunks: ['manifest', 'vendor', 'vendorStyles', 'appStyles', 'app'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
});
