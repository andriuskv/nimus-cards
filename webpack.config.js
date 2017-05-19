const webpack = require("webpack");
const path = require("path");

module.exports = function(env = {}) {
    const plugins = [];

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
            main: "./src/index.js"
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].js"
        },
        module: {
            rules: [
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
                                browsers: ["last 2 versions", "IE >= 11"]
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
