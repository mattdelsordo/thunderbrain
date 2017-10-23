// @flow

/**
 * Describes how webpack bundle should be assembled
 */

import path from 'path'
import webpack from 'webpack'

import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

export default {
  entry: [ // starting point of app
    'react-hot-loader/patch',
    './src/client',
  ],
  output: {
    filename: 'js/bundle.js', // name of generated bundle
    path: path.resolve(__dirname, 'dist'), // destination folder
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`, // destination url
  },
  module: {
    rules: [ // send all js files to babel-loader (transpiler)
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
