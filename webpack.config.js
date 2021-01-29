const path = require('path');
 
module.exports = {
  entry: path.resolve(__dirname, './source/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './out'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './out'),
    compress: true,
    port: 9000,
    hot:true,
    host: 'localhost',
  },
  mode: 'development',
  watch: true
};