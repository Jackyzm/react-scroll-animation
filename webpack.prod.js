const path = require('path');
const nodeExternals = require('webpack-node-externals');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  entry: './src/react-scroll-animation.js',
  output: {
    filename: 'react-scroll-animation.min.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()]
};
