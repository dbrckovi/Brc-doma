const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = (env, argv) => {
    const mode = argv.mode || 'production'

    return {
        mode,
        entry: {
            homePage: './src/pages/home-page.ts',
            samplePage: './src/pages/sample-page.ts'
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                // Absolute imports are searched in node_modules
                path.resolve(__dirname, './node_modules'),
                // Absolute imports are also searched in ./src
                path.resolve(__dirname, './src')
            ],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/i,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.(png|jpg|gif|xml)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        devServer: {
            port: 8080
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                title: "Control Panel",
                template: './templates/home-page.html',
                chunks: ['homePage']
            }),
            new HtmlWebpackPlugin({
                filename: 'sample.html',
                title: "Sample Page",
                template: './templates/sample-page.html',
                chunks: ['samplePage']
            }),
            // Take useful info from build and make it accessible on frontend
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(pkg.version),
                'process.env.MODE': JSON.stringify(mode)
            })
        ]
    }
}
