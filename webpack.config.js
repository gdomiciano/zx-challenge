const path = require('path');
const webpack = require('webpack');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: resolve('./dist/'),
        filename: 'build.js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            // 'src': resolve('src'),
            // 'assets': resolve('src/assets'),
            // 'components': resolve('src/components'),
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
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                },

            },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
                loader: {
                    js: 'babel-loader'
                }
            }
        })
    ]
};