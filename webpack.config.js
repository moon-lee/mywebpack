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
        myCommon: ["./src/js/myCommonModule.js", "./src/scss/mycss.scss"],
        myDashboard: "./src/js/myDashboardModule.js",
        myPayments: "./src/js/myPaymentsModule.js",
        mySpendings: "./src/js/mySpendingsModule.js",
        vendorCalendar: "./src/js/myFullcalendar.js"
        //vendorFlatpickr: "./src/js/myFlatpickr.js"
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
                    from: "./node_modules/flatpickr/dist/flatpickr.min.css",
                    to: "../css/"
                },
                {
                    from: "./node_modules/jquery/dist/jquery.min.js",
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
                // "bundles-utils": {
                //     name: 'bundles.utils',
                //     test: /.[\\/]src[\\/]js[\\/]myUtils.js/,
                //     chunks: "all",
                //     priority: 2
                // }, 
                "bundles-flatpickr": {
                    name: 'bundles.flatpickr',
                    test: /[\\/]node_modules[\\/]flatpickr[\\/]/,
                    chunks: "all",
                    priority: 2
                }, 
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