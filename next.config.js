const path = require('path');
const withCSS = require('@zeit/next-css');
const DotenvWebpackPlugin = require('dotenv-webpack');
const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript(
  withCSS({
    useFileSystemPublicRoutes: false,
    cssLoaderOptions: {
      url: false,
    },
    webpack: config => {
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
          },
        },
      };

      return config;
    },
  }),
);
