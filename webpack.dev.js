const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  merge(common, {
    mode: "development",
    entry: ["./src/sass/index.scss", "./src/ts/index.ts"],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin()],
    optimization: {
      minimize: false
    },
    devtool: "source-map",
    devServer: {
      historyApiFallback: false,
      disableHostCheck: true
    }
  })
];
