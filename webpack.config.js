var webpack = require("webpack")
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  // devtool: "eval", // Transformed code
  devtool: "source-map", // Original code
  entry: {
    bench: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loaders: ["json-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react", // For babel JSX transformation which generates React.createElement.
    }),
    new HtmlWebpackPlugin({title: "OpenChordCharts sample data bench"}),
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
}
