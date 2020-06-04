const webpack = require("webpack");
const path = require('path');
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';

// glob all the template files for entry points
const templateTsFiles = glob.sync(path.join(__dirname, srcDir + 'templates/**.ts')).reduce(function(obj, el){
    obj['templates/' + path.parse(el).name] = el;
    return obj
}, {});

module.exports = {
    entry: {
        popup: path.join(__dirname, srcDir + 'popup.ts'),
        options: path.join(__dirname, srcDir + 'options.ts'),
        background: path.join(__dirname, srcDir + 'background.ts'),
        content_script: path.join(__dirname, srcDir + 'content_script.ts'),
        homepage: path.join(__dirname, srcDir + 'homepage.ts'),
        ...templateTsFiles
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
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin([
                { from: '.', to: '../' }
            ],
            {context: 'public' }
        ),
    ]
};
