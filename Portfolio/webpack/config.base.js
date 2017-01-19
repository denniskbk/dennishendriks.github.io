import path from 'path';
import webpack from 'webpack';

import { config } from '../package.json';

export const source = path.resolve(config.static.src);
export const destination = path.resolve(config.static.dest);

export default function() {
    return {
        entry:  [
            'babel-polyfill',
            // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
            // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.join(source, 'index.js'),
        ],

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'babel'
                    // loaders: ['babel', 'react-hot', 'jsx?harmony'],
                    // include: path.join(__dirname, 'src')
                }
            ]
        },

        output: {
            filename: 'js/[name].js',
            path: destination,
        },

        plugins: [
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
        ]
    }
};
