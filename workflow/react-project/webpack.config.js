const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  if (isProd) {
    return { minimizer: [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()] };
  }
};

const getPlugins = () => {
  let plugins = [
    new HTMLWebpackPlugin({ template: './index.html', minify: { collapseWhitespace: isProd } }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
  ];

  if (isProd) {
    plugins.push(
      new CompressionPlugin({
        algorithm: 'brotliCompress',
        threshold: 0,
        deleteOriginalAssets: true,
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        threshold: 0,
        deleteOriginalAssets: true,
      }),
    );
  }

  return plugins;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: ['./index.jsx'],
  output: { filename: '[contenthash].js', path: path.resolve(__dirname, 'dist') },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
    extensions: ['.js', '.jsx'],
  },
  optimization: optimization(),
  devServer: { port: 8000, hot: isDev },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      { test: /\.ttf$/, type: 'asset/resource' },
      {
        test: /.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
