const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              keep_quoted: true,
            },
          },
        },
      }),
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        removeComments: true,
        // removeAttributeQuotes: true,
        removeScriptTypeAttributes: true,
        removeTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        inlineSource: ".(js|ts)$",
      }
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
    new ScriptExtHtmlWebpackPlugin({
      // inline: "main",
    })
  ],
};
