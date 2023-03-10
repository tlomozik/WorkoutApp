module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    'jsx-a11y',
    'import',
    'styled-components-a11y',
  ],
  parser: '@babel/eslint-parser',
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'off',
    'linebreak-style': 'off',
    'object-curly-spacing': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'requireConfigFile': 'false'
  },
  globals: {
    fetch: false,
  },
};
