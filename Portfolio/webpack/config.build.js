import webpack from 'webpack';
import base from './config.base';


const config = base('development');

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
   })
]);


export default config;
