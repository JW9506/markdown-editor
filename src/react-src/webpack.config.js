const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const publicURLRoot = '/'
const SPATitle = require('../../package.json')['name']

module.exports = (_, { mode = 'production' }) => {
  const isProduction = mode === 'production'
  const isDevelopment = !isProduction
  process.env.BABEL_ENV = mode
  const commonCSSLoaders = [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [require('postcss-preset-env')],
        },
      },
    },
  ]
  const config = {
    target: 'electron-renderer',
    mode,
    entry: ['react-hot-loader/patch', './src/js/index.tsx'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[fullhash:10].js',
      publicPath: publicURLRoot,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.css$/i,
              use: [...commonCSSLoaders],
            },
            {
              test: /\.less$/i,
              use: [...commonCSSLoaders, 'less-loader'],
            },
            {
              test: /\.scss$/i,
              use: [
                ...commonCSSLoaders,
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: ['src/css/global.scss'],
                  },
                },
              ],
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: 'url-loader',
              options: {
                limit: 8 * 1024,
                name: '[contenthash:10].[ext]',
                outputPath: 'imgs',
                publicPath: `${publicURLRoot}/imgs`.replace(/\/\//g, '/'),
              },
            },
            {
              test: /\.(t|j)sx?$/i,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      // new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        title: SPATitle,
        minify: {
          removeComments: isProduction,
          collapseWhitespace: isProduction,
        },
        favicon: 'src/favicon.ico',
      }),
      isProduction &&
        new MiniCssExtractPlugin({ filename: 'css/main.[contenthash:10].css' }),
      isProduction && new OptimizeCssAssetsPlugin(),
    ].filter(Boolean),
    devServer: {
      compress: true,
      hot: true,
      quiet: true,
      contentBase: path.resolve(__dirname, 'src'),
      historyApiFallback: true,
    },
    performance: {
      assetFilter(assetFilename) {
        return assetFilename.endsWith('.js')
      },
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  }
  return config
}
