const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

    mode: "production",

    entry: {
        custom: ["./src/js/myscript.js", "./src/scss/mycss.scss"],
        fonts: "./src/js/fontawesome.js",
        fullcalendar: "./src/js/fullcalendar.js"
    },

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
        new CleanWebpackPlugin(['dist']),

        new CopyWebpackPlugin(
            [
                {
                    from: "./node_modules/bootstrap/dist/css/bootstrap.min.css",
                    to: "../css/"
                },
                {
                    from: "./node_modules/jquery/dist/jquery.slim.min.js",
                    to: "../js/"
                },
                {
                    from:  "./node_modules/popper.js/dist/umd/popper.min.js",
                    to: "../js/"
                },
                {
                    from: "./node_modules/bootstrap/dist/js/bootstrap.min.js",
                    to: "../js/"
                }
            ],
            {
                debug: 'debug'
            }
        ), 

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

/*         new webpack.ProvidePlugin(
            {
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "defualt"]
            }

        ), */

        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/, /en-au/
        ) 
    ],

    performance: {
        hints: "warning", // enum   
        maxEntrypointSize: 400000 // int (in bytes)
    },

    devtool: "source-map",

    externals: {
        jquery: "jQuery"
    },

    resolve: {
        extensions: [".js", ".css", ".scss"],
/*          alias: {
            "jquery": "jquery/dist/jquery.slim.min.js"
        }  */
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ],
        splitChunks: {
            cacheGroups: {
/*                 "bundles-web": {
                    name: 'bundles.web',
                    test: /[\\/]node_modules[\\/](jquery|bootstrap|popper.js)[\\/]/,
                    chunks: "all",
                    priority: 2
                }, */
                "bundles-moment": {
                    name: 'bundles.moment',
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    chunks: "all",
                    priority: 2
                }              
            }
        }
    }
}