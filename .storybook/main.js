const path = require('path');
const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y',
    'storybook-mobile',
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, `../${compilerOptions.baseUrl}`),
    ]

    return config;
  },
};
