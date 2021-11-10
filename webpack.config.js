const path = require("path");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
      filename: "main.css"
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CopyPlugin({ patterns: [
      { from: "./public", globOptions: {
        ignore: ["**/index.html"]
      }}
    ]})
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
    target: "browserslist",
    entry: {
      main: "./src/index.js"
    },
    output: {
      path: path.resolve(__dirname, "./build"),
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
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 2021,
            output: {
              comments: false
            }
          }
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              "default",
              { discardComments: { removeAll: true } }
            ]
          }
        })
      ]
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
              loader: "sass-loader",
              options: {
                sourceMap: !env.prod
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", {
                modules: false,
                loose: true,
                bugfixes: true,
                useBuiltIns: "usage",
                corejs: 3
              }], ["@babel/preset-react", {
                runtime: "automatic"
              }]]
            }
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
