var webpack = require("webpack");
var path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

var sourcePath = path.resolve(__dirname, "src");
var jsSourcePath = path.resolve(__dirname, "src");
var buildPath = path.resolve(__dirname, "dist");

var config = {
  mode: "development",
  entry: sourcePath + "/main.js",
  output: {
    path: buildPath,
    // publicPath: "/dist/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv({
      systemvars: true
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules", jsSourcePath],
    alias: {
      "vuejs-datatable": "vuejs-datatable/dist/vuejs-datatable.esm.js"
    }
  },
  devServer: {
    port: 3003,
    publicPath: "http://localhost:3003/dist/",
    contentBase: path.join(__dirname, "public/")
  },
  devtool: "eval-source-map"
};

module.exports = config;
