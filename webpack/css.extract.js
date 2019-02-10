const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          use: ExtractTextPlugin.extract(
            {
              publicPath: '../',
              fallback: 'style-loader',
              use: [
                { 
                  loader: "css-loader", 
                  options: { sourceMap: true } 
                },
                {
                  loader: "postcss-loader",
                  options: { sourceMap: true, config: { path: 'src/postcss.config.js' } }
                },
              ]
            }
          )
        },
        {
          test: /\.scss$/,
          include: paths,
          use: ExtractTextPlugin.extract(
            {
              publicPath: '../',
              fallback: 'style-loader',
              use: [
                {
                  loader: "css-loader",
                  options: { sourceMap: true }
                }, 
                {
                  loader: "postcss-loader",
                  options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
                }, 
                {
                  loader: "sass-loader",
                  options: { sourceMap: true }
                }
              ]
            }
          )
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "./[name].css"
      })
    ]
  }
};