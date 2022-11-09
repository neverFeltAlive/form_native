const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.js",
    },
    output: {
        filename: "./static/js/[name].[contenthash].js",
        path: path.resolve(__dirname, "build"),
    },
    resolve: {
        extensions: [".js", ".json", ".png", ".jpg", ".ts", ".tsx"],
        alias: {
            "@styles": path.resolve(__dirname, "src/static/css"),
            "@scripts": path.resolve(__dirname, "src/static/scripts"),
            "@": path.resolve(__dirname, "src"),
        }
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    },
    devServer: {
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: path.resolve(__dirname, "build/static/images"),
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: path.resolve(__dirname, "build/static/fonts"),
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node-modules/,
            },
            {
                test: /\.xml$/,
                use: ["xml-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"],
                exclude: /node_modules/,
            },
        ]
    }
}