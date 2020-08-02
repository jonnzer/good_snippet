module.exports = {
  entry: __dirname + '/sw-test/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  devServer: {
    port: '8081'
  }
}