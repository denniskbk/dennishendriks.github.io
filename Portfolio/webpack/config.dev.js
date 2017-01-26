import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import SassLintPlugin from 'sasslint-webpack-plugin';
import base, { source } from './config.base';


const config = base('development');

config.watch = true;
config.devtool = 'inline-source-map';

config.eslint = {
    configFile: '.eslintrc'
};

config.module.loaders = config.module.loaders.concat([
    {
        test: /\.js$/,
        include: [ source ],
        loader: 'eslint-loader'
    }
]);

config.plugins = config.plugins.concat([
    new SassLintPlugin({
        configFile: '.sass-lint.yml',
        context: [ source ],
        quiet: false,
        failOnWarning: false,
        failOnError: false,
        testing: false
    }),
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
