import child_process from "child_process"
import fs from "fs"

import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"


const chartsDirPath = "./data/charts/"
const chartsFileNames = fs.readdirSync(chartsDirPath)

const isProduction = process.env.NODE_ENV === "production"
const devtool = isProduction ? null : "source-map"

const gitCommitSha = child_process.spawnSync("git", ["show", "-s", "--format=%H"]).stdout.toString()
const lastUpdatedOn = child_process.spawnSync("git", ["show", "-s", "--format=%ci"]).stdout.toString()
const packageVersion = process.env.npm_package_version

const plugins = [
  new webpack.DefinePlugin({
    CHARTS_FILE_NAMES: JSON.stringify(chartsFileNames),
    GIT_COMMIT_SHA: JSON.stringify(gitCommitSha),
    LAST_UPDATED_ON: JSON.stringify(lastUpdatedOn),
    PACKAGE_VERSION: JSON.stringify(packageVersion),
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
  devtool,
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
        loader: "babel",
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: "json",
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
}
