const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const path = require('path')
const fs = require('fs')

function getPageTemplate() {
    const base = path.resolve(__dirname, './src')
    const dir = fs.readdirSync(base)
    const plugin = []
    for (let i = 0; i < dir.length; i++) {
        try{
            if (fs.statSync(path.resolve(base, dir[i] + '/main.ts')).isFile()) {
                plugin.push(new HtmlWebpackPlugin({
                    title: dir[i],
                    template: path.resolve(__dirname, './index.html'),
                    filename: 'view/' + dir[i] + '.html',
                    inject: true,
                    chunks: [dir[i]]
                }))
            }
        }catch (e) {

        }


    }
    return plugin
}

module.exports = {
    mode: "development",
    entry: () => {
        const base = path.resolve(__dirname, './src')
        const dir = fs.readdirSync(base)
        return dir.reduce((r, it) => {
            try {
                if (fs.statSync(path.resolve(base, it + '/main.ts')).isFile()) {
                    r[it] = path.resolve(base, it + '/main.ts')
                    return r
                }
            }catch (e) {

            }

            return r
        }, {})
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "ts-loader"
                }]

            },
            {
                test: /\.(vert|frag|geom)$/,
                use: 'raw-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            name: entrypoint => {
                return entrypoint.name
            }
        },
        runtimeChunk: {
            name: entrypoint => {
                return `runtime_chunk~${entrypoint.name}`
            }
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'Output Management',
        // }),
        new FriendlyErrorsWebpackPlugin(),
        ...getPageTemplate(),
        new CleanWebpackPlugin()
    ],
    devtool: "eval-cheap-source-map",
    devServer: {
        publicPath: '/',
        contentBase: './dist/view',
        writeToDisk: true,
        hot: true,
        port: 9000,
        serveIndex: true,
        quiet: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}
