import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import base, { source } from './config.base';

const config = base('development');

// development overrides go here
config.watch = true;
// config.devtool = 'cheap-module-eval-source-map';
config.devtool = 'inline-source-map'; // See http://webpack.github.io/docs/configuration.html#devtool

// // append linting options
// config.eslint = {
//     configFile: '.eslintrc'
// };
//
// config.module.loaders = config.module.loaders.concat([
//     {
//         test: /\.js$/,
//         include: [ source ],
//         loader: 'eslint-loader'
//     }
// ]);
//
config.plugins = config.plugins.concat([
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost/portfolio/',
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            }
        }
    })
]);

export default config;
