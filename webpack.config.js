const path = require('path');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const extracktCss = require('./webpack/css.extract');

const common = merge([
  {
    entry: {
      app: './src/index.ts'
    },
    devtool: "source-map",
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, 'src'),
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    devServer: {
      overlay: true
    },
  },
  extracktCss()
]);

module.exports = function(env) {
  if(env === 'production') {
    return common;
  }
  if(env === 'development') {
    return merge([
      common,
      devserver()
    ]);
  }
};