const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    page: './src/page.js', //на страницах где нужен css
    index: './src/index.jsx', //на страницах где я использую своим компоненты jsx
    M_Card: './src/javascript/M_Card.jsx',
    A_Chips: './src/javascript/A_Chips.jsx',
    A_CardText: './src/javascript/A_CardText.jsx',
    cardsChevron: './src/javascript/cardsChevron.js',
    sidebar: './src/javascript/sidebar.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/images',
          to: 'images',
          noErrorOnMissing: true
        }
      ]
    }),

    // Landing page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['page', 'index', 'A_CardText', 'cardsChevron'] // было index
    }),

    // Internal pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/page.html',
      filename: './pages/page.html',
      chunks: ['page', 'M_Card']
    }),

    // Theory page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Theory.html',
      filename: './pages/Theory.html',
      chunks: ['page', 'index', 'A_CardText']
    }),

    // Practice page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Practice.html',
      filename: './pages/Practice.html',
      chunks: ['page', 'index', 'A_CardText']
    }),

    // About Us page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/About_Us.html',
      filename: './pages/About_Us.html',
      chunks: ['page']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Main.html',
      filename: './pages/Main.html',
      chunks: ['page']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Article_1.html',
      filename: './pages/Article_1.html',
      chunks: ['page', 'sidebar']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Article_2.html',
      filename: './pages/Article_2.html',
      chunks: ['page', 'sidebar']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Article_3.html',
      filename: './pages/Article_3.html',
      chunks: ['page', 'sidebar']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Article_none.html',
      filename: './pages/Article_none.html',
      chunks: ['page', 'sidebar']
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      // analytics
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      },
      // Header для Main
      {
        path: path.join(__dirname, './src/partials/navbar.html'),
        location: 'navbar',
        template_filename: '*',
        priority: 'replace'
      },
      // Header прилипающий для статей
      {
        path: path.join(__dirname, './src/partials/navbar-2.html'),
        location: 'W_navbar-2',
        template_filename: '*',
        priority: 'replace'
      },
      {
        path: path.join(__dirname, './src/partials/sidebar-theory.html'),
        location: 'sidebar-theory',
        template_filename: '*',
        priority: 'replace'
      },
      {
        path: path.join(__dirname, './src/partials/Up_Button.html'),
        location: 'Up_Button',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  }
}
