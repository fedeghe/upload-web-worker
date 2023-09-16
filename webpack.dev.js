const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
module.exports = {
  entry: {
      index: path.resolve(__dirname, './source/index.js'),
    //   index: path.resolve(__dirname, './source/uploader.js'),  FOR DIST, move to webpack.prod.config.js
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    // libraryTarget: "commonjs-module" // FOR DIST, move to webpack.prod.config.js
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'development',
      template: 'source/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 9000,
    hot:true,
    host: 'localhost',
  },
  mode: 'development',
};