const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const {PROJECT_PATH} = require("./contant");
// const styleLoader = require("style-loader");
// const cssLoader = require("css-loader");
const {isDev, isPrd} = require("./config/env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

//为啥不分开写？
const getCssLoaders = () => {
  let cssLoader = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: "[local]--[hash:base64:5]"
        },
        sourceMap: isDev
      }
    }
  ]

  //依据生产环境添加postcss插件
  isPrd && cssLoader.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          isPrd && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }
            }
          ]
        ]
      }
    }
  })

  return cssLoader;
}
  
module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, "./src/index.js")
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [...getCssLoaders()]
    },{
      test: /\.less$/,
      use: [
        ...getCssLoaders(),
        {
          loader: 'less-loader',
          options: {
            sourceMap: isDev,
          }
        }
      ]
    },{
      test: /\.scss$/,
      use: [
        ...getCssLoaders(),
        {
          loader: 'sass-loader',
          options: {
            sourceMap: isDev
          }
        }
      ]

    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, "./public/index.html")
    }),
    new WebpackBar({
      name: 'Build Successfully!', 
      color: '#FFCB5B'
    }),
  ]
}
