const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';

module.exports = {
    entry: {
        popup: path.join(__dirname, srcDir + 'popup.ts'),
        options: path.join(__dirname, srcDir + 'options.ts'),
        background: path.join(__dirname, srcDir + 'background.ts'),
        "controlled-tab-content-script": path.join(__dirname, srcDir + 'controlled-tab-content-script.ts'),
        homepage: path.join(__dirname, srcDir + 'homepage.ts'),
        overlay: path.join(__dirname, srcDir + 'overlay-content/overlay.ts')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.html']
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin([
            {
                from: path.join(__dirname, '../public'),
                to: path.join(__dirname, '../dist')
            },
            {
                from: path.join(__dirname, '../src/overlay-content/overlay.css'),
                to: path.join(__dirname, '../dist')
            }
        ]),
    ],
    devtool: 'cheap-module-source-map'
};
