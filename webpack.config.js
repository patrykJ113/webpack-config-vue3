const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require("path");

module.exports = {
  mode: 'development',
  entry: {
    main: "./src/main.js",
  },
	devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		compareBeforeEmit: true,
		clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/assets/template.html'
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
        'Vue': 'vue/dist/vue.esm-bundler.js',
    }
  },
};