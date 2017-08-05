const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env = {}) {
    const plugins = [
        new ExtractTextPlugin("main.css"),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            excludeChunks: ["sw"]
        })
    ];

    if (env.prod) {
        plugins.push(
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    unused: true,
                    dead_code: true,
                    screw_ie8: true,
                    unsafe: true,
                    conditionals: true,
                    comparisons: true,
                    sequences: true,
                    evaluate: true,
                    drop_console: true
                },
                output: {
                    comments: false
                }
            })
        );
    }

    return {
        entry: {
            main: "./src/index.js",
            sw: "./src/sw.js"
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: !env.prod
                            }
                        },{
                            loader: "postcss-loader",
                            options: {
                                sourceMap: !env.prod,
                                plugins: () => {
                                    const plugins = [require("autoprefixer")()];

                                    if (env.prod) {
                                        plugins.push(
                                            require("css-mqpacker")(),
                                            require("cssnano")()
                                        );
                                    }
                                    return plugins;
                                }
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: !env.prod
                            }
                        }]
                    })
                },
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        plugins: [
                            "transform-class-properties"
                        ],
                        presets: [["env", {
                            modules: false,
                            useBuiltIns: true,
                            targets: {
                                browsers: ["last 1 versions", "IE >= 11"]
                            }
                        }], "react"]
                    }
                }
            ]
        },
        devtool: env.prod ? false : "inline-source-map",
        plugins
    };
};
