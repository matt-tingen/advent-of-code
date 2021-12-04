require('@matt-tingen/eslint-config/patch');

module.exports = {
  root: true,
  extends: ['@matt-tingen/eslint-config/base'],
  rules: {
    'import/no-default-export': 'off',
    'jest/no-standalone-expect': 'off',
  },
};
