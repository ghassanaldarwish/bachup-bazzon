const withTypescript = require('@zeit/next-typescript');
const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');
module.exports = withTypescript({
  useFileSystemPublicRoutes: false,
  webpack: function (config, { buildId, dev }) {
    const originalEntry = config.entry;
      config.module.rules = [
        ...(config.module.rules || []),
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: 'url-loader?limit=100000',
        },
      ];

  config.plugins = [...(config.plugins || []), new DotenvWebpackPlugin()];
    config.resolve = {
      ...config.resolve,
      ...{
        alias: {
          ...config.resolve.alias,
          '@src': path.resolve(__dirname, 'client'),
        }
      },
    };

    return config
  }
});
