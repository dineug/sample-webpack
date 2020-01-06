const pkg = require("./package.json");
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPrefixer = require("postcss-prefixer");
const autoprefixer = require("autoprefixer");

module.exports = [
  merge(common, {
    entry: {
      sample: ["./src/ts/index.ts", "./src/sass/index.scss"]
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: [
                  autoprefixer(),
                  postcssPrefixer({
                    prefix: `${pkg.name}-`
                  })
                ]
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
    plugins: [new CleanWebpackPlugin()],
    optimization: {
      minimize: false
    }
  }),
  merge(common, {
    entry: {
      "sample.min": "./src/ts/index.ts"
    }
  })
];
