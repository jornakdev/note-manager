const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins:[
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Notes',
            template: 'index.html'
        }),
    ]
};