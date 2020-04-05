const path = require('path')
const webpack = require('webpack')

console.log(path.resolve(__dirname, 'node_modules/supercapacitor'))

module.exports = {
  mode: 'development',
  entry: {
    app: './app.jsx'
  },
  output: {
    path: path.resolve('../public/assets/build'),
    filename: 'js/app.js',
    publicPath: '/assets/build/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve('./'), 'node_modules']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)s(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader'
      // }
    ]
  }
}
