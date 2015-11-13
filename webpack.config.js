var webpack = require("webpack")


module.exports = {
  // devtool: "eval", // Transformed code
  devtool: "source-map", // Original code
  entry: {
    bench: "./src/index.js",
  },
  output: {
    filename: "[name].js",
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
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
}
