import webpack from 'webpack';
import base from './config.base';

const config = base('development');

// production overrides go here
// config.plugins = config.plugins.concat([
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false,
//         },
//         comments: false
//     })
// ]);

export default config;
