var fs = require("fs")
var path = require("path")

var HtmlWebpackPlugin = require("html-webpack-plugin")
var webpack = require("webpack")


var chartsDirPath = "./data/charts/"
var chartsFileNames = fs.readdirSync(chartsDirPath)


module.exports = {
  // devtool: "eval", // Transformed code
  devtool: "source-map", // Original code
  entry: {
    bench: "./src/index.jsx",
  },
  output: {
    filename: "[name]-bundle-[hash].js",
    path: path.join(__dirname, "/dist"),
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
    new webpack.DefinePlugin({
      CHARTS_FILE_NAMES: JSON.stringify(chartsFileNames),
    }),
    new webpack.ProvidePlugin({
      React: "react", // For babel JSX transformation which generates React.createElement.
    }),
    new HtmlWebpackPlugin({title: "OpenChordCharts sample data bench"}),
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
}
