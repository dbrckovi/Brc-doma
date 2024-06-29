const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = (env, argv) => {
    const mode = argv.mode || 'production'

    return {
        mode,
        entry: './src/index.ts',
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
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        devServer: {
            port: 8080
        },
        plugins: [
            new HtmlWebpackPlugin({template: './index.html'}),
            // Take useful info from build and make it accessible on frontend
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(pkg.version),
                'process.env.MODE': JSON.stringify(mode)
            })
        ]
    }
}
