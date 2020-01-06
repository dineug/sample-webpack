const pkg = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BANNER = [
  "sample",
  "@version " + pkg.version + " | " + new Date().toDateString(),
  "@author " + pkg.author,
  "@license " + pkg.license
].join("\n");

module.exports = {
  mode: "production",
  output: {
    library: ["sample"],
    libraryTarget: "umd",
    libraryExport: "default",
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader", "eslint-loader"]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: "url-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@src": path.resolve(__dirname, "./src/ts/")
    }
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: BANNER,
      entryOnly: true
    }),
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: `${pkg.name}.css`
    })
  ]
};
