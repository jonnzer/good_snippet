var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my_bundle.js'
  },
  module: {
    rules: [
        { test: /\.js$/,
         loader: 'babel-loader',
         include: /node_modules/, 
         query: {
                presets: ['es2015']
            }
         }
     ]
    },
  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
     extensions: [".js", ".json", ".jsx", ".css"],
    },
    plugins: []
};