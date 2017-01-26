import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixerConfig from '../node-config/autoprefixer.json';

import { config } from '../package.json';


export const source = path.resolve(config.static.src);
export const destination = path.resolve(config.static.dest);

export default function() {
    return {
        entry:  [
            path.join(source, 'js', 'index.js'),
            path.join(source, 'scss', 'main.scss')
        ],

        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style', 'raw!postcss!sass')
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'babel'
                }
            ]
        },

        sassLoader: config.sass,

        output: {
            filename: 'js/[name].js',
            path: destination,
        },

        postcss: function() {
            return {
                defaults: [ autoprefixer ],
                cleaner:  [ autoprefixer(autoprefixerConfig) ]
            };
        },

        plugins: [
            new ExtractTextPlugin('css/[name].css'),
            new webpack.NoErrorsPlugin(),
        ]
    }
};
