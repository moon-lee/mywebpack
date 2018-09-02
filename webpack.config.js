const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {

    mode: "production",

    entry: {
        custom: ["./src/js/myscript.js", "./src/scss/mycss.scss"],
        vendors: "./src/js/vendors.js",
        fonts: "./src/js/fontawesome.js",
        fullcalen: "./src/js/fullcalen.js"
    },

    output: {
        filename: "[name].js",
        chunkFilename: "bundles.[name].js",
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

/*         new CopyWebpackPlugin(
            [
                {
                    from: "./node_modules/moment/moment.js",
                    to: "../js/"
                }
            ],
            {
                debug: 'debug'
            }
        ),  */

        new MiniCssExtractPlugin(
            {
                filename: "../css/[name].css",
                chunkFilename: "../css/bundles.[name].css"
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
            /moment[\/\\]locale$/, /en/
        ) 
    ],

    devtool: "source-map",
//    devtool: "cheap-source-map",

    resolve: {
        extensions: [".js", ".css", ".scss"],
        alias: {
            "jquery": "jquery/dist/jquery.js",
            //moment$: "moment/moment",
        }
    },

/*     externals: {
        // shows how we can rely on browser globals instead of bundling these dependencies,
        // in case we want to access jQuery from a CDN or if we want an easy way to
        // avoid loading all moment locales: https://github.com/moment/moment/issues/1435
        moment: 'moment'
    },  */

    optimization: {
        splitChunks: {
            cacheGroups: {
                "vendor-bootstrap": {
                    name: 'bootstrap',
                    test: /[\\/]node_modules[\\/](jquery|bootstrap|popper.js)[\\/]/,
                    chunks: "initial",
                    priority: 2
                },
/*                 "vendor-moment": {
                    name: 'moment',
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    chunks: "initial",
                    priority: 2
                }   */

            }
        }
    }
}