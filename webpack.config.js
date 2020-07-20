const path = require("path");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function(env = {}) {
  const mode = env.prod ? "production" : "development";
  const plugins = [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(mode)
      }
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      cache: false
    }),
    new CopyPlugin({ patterns: [{ from: "./public" }]})
  ];

  if (env.prod) {
    plugins.push(new workboxPlugin.GenerateSW({
      swDest:  "./sw.js",
      maximumFileSizeToCacheInBytes: 10000000,
      skipWaiting: true,
      clientsClaim: true,
      disableDevLogs: true
    }));
  }

  return {
    mode,
    entry: {
      main: "./src/index.js"
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: "vendor",
            chunks: "initial"
          }
        }
      },
      minimizer: [new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 8,
          output: {
            comments: false
          }
        }
      }), new OptimizeCSSAssetsPlugin({})]
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: !env.prod,
                url: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !env.prod,
                plugins() {
                  return [
                    require("autoprefixer")(),
                    require("css-mqpacker")()
                  ];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !env.prod
              }
            }
          ]
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: [["@babel/preset-env", {
              modules: false,
              loose: true,
              bugfixes: true,
              useBuiltIns: "usage",
              corejs: 3
            }], "@babel/react"]
          }
        }
      ]
    },
    devtool: env.prod ? false : "inline-source-map",
    plugins,
    stats: {
      entrypoints: false,
      children: false
    }
  };
};
