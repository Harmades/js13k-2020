const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// 'boss','enemy','sword','axe','lance','cross','check'
module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
          sourceMap: false,
          extractComments: false, // To avoid separate file with licenses.
          terserOptions: {
              mangle: {
                  properties: {
                      regex: /.*/,
                      keep_quoted: true,
                      reserved: ['ball','boss','enemy']
                  }
              },
              module: true,
              sourceMap: false,
              keep_classnames: false,
              keep_fnames: false,
              toplevel: true,
          },
      })],
  }
};
