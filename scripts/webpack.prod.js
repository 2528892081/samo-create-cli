const {merge} = require("webpack-merge")
const path = require("path");

const common = require("./webpack.common");
const {PROJECT_PATH} = require("./contant");

const {MiniCssExtractPlugin} = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  target: 'browserslist',
  devtool: false,
  module: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    })
  ],
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve(PROJECT_PATH, "./dist")
  }
})