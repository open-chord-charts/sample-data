import child_process from "child_process"
import fs from "fs"
import path from "path"

import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"


const chartsDirPath = "./data/charts/"
const chartsFileNames = fs.readdirSync(chartsDirPath)

const gitCommitSha = child_process.spawnSync("git", ["show", "-s", "--format=%H"]).stdout.toString()
const lastUpdatedOn = child_process.spawnSync("git", ["show", "-s", "--format=%ci"]).stdout.toString()
const packageVersion = process.env.npm_package_version


export default {
  entry: "./src/index",
  output: {
    filename: "bundle-[hash].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/static/",
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
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      CHARTS_FILE_NAMES: JSON.stringify(chartsFileNames),
      GIT_COMMIT_SHA: JSON.stringify(gitCommitSha),
      LAST_UPDATED_ON: JSON.stringify(lastUpdatedOn),
      PACKAGE_VERSION: JSON.stringify(packageVersion),
      "process.env": {
        "NODE_ENV": JSON.stringify("production"),
      },
    }),
    new webpack.ProvidePlugin({
      React: "react", // For babel JSX transformation which generates React.createElement.
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./index.template.html",
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false,
      },
    }),
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
}
