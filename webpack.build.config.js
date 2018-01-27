const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  entry: {
    main: path.resolve(__dirname, `./src/index.ts`),
    vendor: ['pixi', 'p2', 'phaser-ce']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
    alias: {'phaser-ce': phaser, p2, 'pixi': pixi}
  },

  stats: {
    colors: true,
    reasons: true,
    errorDetails: true
  },

  devtool: false,

  module: {
    rules: [
      {
        test: /pixi\.js/,
        use: ['expose-loader?PIXI']
      },
      {
        test: /phaser-split\.js$/,
        use: ['expose-loader?Phaser']
      },
      {
        test: /p2\.js/,
        use: ['expose-loader?p2']
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'tslint-loader',
            query: {
              configFile: path.resolve(__dirname, './tslintConfig.js')
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        // exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|mp4)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
//             emitFile: false
//             name: 'static/images/[name].[ext]'
          }
        }
      },
      {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 5000,
//             emitFile: false
//             name: 'static/font/[name].[ext]'
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({}),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
