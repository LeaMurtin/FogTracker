import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ...pluginReactConfig, settings: { react: { version: 'detect' } } },
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    rules: {
      curly: 'error',
      'dot-notation': 'off',
      'eol-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'guard-for-in': 'off',
      'new-parens': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'off',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-console': ['error', { allow: ['error', 'log', 'warn', 'info'] }],
      'no-debugger': 'error',
      'no-empty': 'off',
      'no-eval': 'error',
      'no-fallthrough': 'off',
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-restricted-imports': ['error', 'moment'],
      'no-shadow': 'off',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'error',
      'no-var': 'error',
      radix: 'error',
      'sort-keys': 'off',
      'spaced-comment': ['off', 'always'],
      'use-isnan': 'error',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: false }],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/type-annotation-spacing': [
        'error',
        {
          after: true,
          before: false,
          overrides: {
            arrow: { after: true, before: true },
          },
        },
      ],
    },
  },
];
