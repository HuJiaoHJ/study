#### eslint配置

http://eslint.cn/docs/user-guide/configuring

.eslintrc.js

```javascript
// eslint@3.10.2

module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: true,
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        commonjs: true,
        'shared-node-browser': true,
        es6: true,
        worker: true,
        serviceworker: true,
    },
    globals: {
        "angular": 1,
        "moment": 1,
        "$": 1,
        "echarts": 1,
        "Analytics": 1,
    },
    plugins: [
        "html"
    ],
    extends: [
        'eslint:recommended',
    ],
    root: true,
    rules: {
        'no-console': 1,
        'no-constant-condition': [1, {'checkLoops': false}],
        'no-debugger': 1,
        'no-unreachable': 1,
        'no-unused-vars': [1, {'args': 'none'}],
        'quotes': [1, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
        'semi': 1,
    },
};
```
