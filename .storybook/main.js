const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    'storybook-addon-paddings',
    'storybook-dark-mode',
    '@storybook/addon-viewport/register',
  ],
  webpackFinal: async (config) => {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    );
    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
