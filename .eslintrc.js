module.exports = {
  extends: [
    'airbnb-typescript-prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.tsx',
        ],
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['draft', 'state', 'res'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  }
};
