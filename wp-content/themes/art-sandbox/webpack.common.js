const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/app.js',
    // vendor: './src/vendor.js'
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/assets/images', to: './images' }],
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
