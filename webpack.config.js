var fs = require("fs")

var HtmlWebpackPlugin = require("html-webpack-plugin")
var webpack = require("webpack")


var chartsDirPath = "./data/charts/"
var chartsFileNames = fs.readdirSync(chartsDirPath)
var isProduction = process.env.NODE_ENV === "production"
var devtool = isProduction ? null : "source-map"

var plugins = [
  new webpack.DefinePlugin({
    CHARTS_FILE_NAMES: JSON.stringify(chartsFileNames),
  }),
  new webpack.ProvidePlugin({
    React: "react", // For babel JSX transformation which generates React.createElement.
  }),
  new HtmlWebpackPlugin({title: "OpenChordCharts sample data bench"}),
]

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({comments: false})
  )
}


module.exports = {
  devtool: devtool,
  entry: "./src/index.jsx",
  output: {
    filename: "bundle-[hash].js",
    path: "./dist",
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
  plugins: plugins,
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
}
