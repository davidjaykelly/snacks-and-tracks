var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:8082",
        secure: false,
      },
    },
    historyApiFallback: true,
  },
      
  module: {
    rules: [
      // Handle CSS files
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      // Handle JS files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // handle image files
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader?limit=100000",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/index.html",
      filename: "./index.html",
    }),
  ],
};
