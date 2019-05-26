var webpack = require('webpack');
var path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
let jsUrl = require('./jsCompile.json').jsUrl;

module.exports = {
  entry: jsUrl,
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
         },
         {
          test: /\.vue$/,
          use:[
              {
                  loader: 'vue-loader',
              },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
              'file-loader'
           ]
       }
     ]
    },
  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
     extensions: [".js", ".json", ".jsx", ".css"],
    },
    plugins: [
      // new VueLoaderPlugin()
    ]
};