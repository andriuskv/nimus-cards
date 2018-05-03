const path = require("path");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
            template: "./src/index.html"
        })
    ];

    if (env.prod) {
        plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    ecma: 8
                }
            })
        );
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
            }
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: !env.prod,
                                url: false,
                                minimize: env.prod
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: !env.prod,
                                plugins: () => [
                                    require("autoprefixer")(),
                                    require("css-mqpacker")()
                                ]
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
                            shippedProposals: true,
                            loose: true,
                            useBuiltIns: "usage"
                        }], "@babel/react"],
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                            "transform-class-properties"
                        ]
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
