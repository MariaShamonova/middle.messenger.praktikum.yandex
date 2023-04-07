const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackElementPlugin = require('html-webpack-element-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001,
    compress: true,
    hot: true,
  },
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      appMountId: 'root',
      bodyHtmlSnippet: '<main id="root"></main>',
    }),
    new HtmlWebpackElementPlugin({ tagId: 'root', tagName: 'main' }),
    new HtmlWebpackElementPlugin({ tagId: 'header', tagName: 'header' }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      fs: false,
    },
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          runtime: path.resolve(__dirname, 'src/helpers/registerHelpers.js'),
        },
      },
    ],
  },
};
