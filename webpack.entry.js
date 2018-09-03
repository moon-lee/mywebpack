const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    mode: "production",

    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        path: path.join(__dirname, "dist/js")
    },

    module: {
        rules: [
            // css 
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },

            // scss
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]

    },

    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: "../css/[name].css",
                chunkFilename: "../css/[name].css"
            }
        ),

        new webpack.LoaderOptionsPlugin(
            {
                minimize: true,
                options: {
                    postcss: [
                        autoprefixer()
                    ]
                }
            }
        ),

        new webpack.ProvidePlugin(
            {
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "defualt"]
            }

        ),

        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/, /en-au/
        ) 
    ],

    performance: {
        hints: "warning", // enum   
        maxEntrypointSize: 400000 // int (in bytes)
    },

    devtool: "source-map",

    resolve: {
        extensions: [".js", ".css", ".scss"],
        alias: {
            "jquery": "jquery/dist/jquery.js"
        }
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                "bundles-web": {
                    name: 'bundles.web',
                    test: /[\\/]node_modules[\\/](jquery|bootstrap|popper.js)[\\/]/,
                    chunks: "all",
                    priority: 2
                },
                "bundles-moment": {
                    name: 'bundles.moment',
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    chunks: "all",
                    priority: 2
                },
            }
        }
    }
}