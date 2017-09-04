const path = require('path');
const webpack = require('webpack');

// const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'build.js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.common.js',
        },
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /(node_modules)/,
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',

            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                },

            },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
                loader: {
                    js: 'babel-loader',
                },
            },
        }),
    ],
};
