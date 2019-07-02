module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "func-names": [0],
        "no-console": [0],
        "no-bitwise": [0],
        "eqeqeq": [0],
        "object-shorthand": [0],
        "prefer-arrow-callback": [0],
        "import/no-unresolved": [0],
        "import/no-extraneous-dependencies": [0],
        "no-unused-vars": [0],
        "no-param-reassign": [0],
        "max-len": [0, 150],
        "import/first": [0],
        "global-require": [0],
        "arrow-parens": [0, "as-needed"],
        "no-use-before-define": [0],
        "no-multi-assign": [0],
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "no-underscore-dangle": [0],
        "linebreak-style": [0, "windows"],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-trailing-spaces": [0],
        "comma-dangle": ["error", "only-multiline"],
        "comma-spacing": ["error", { "before": false, "after": true }],  
        "prefer-template": [0],
        "semi": ["error", "always"],//语句强制用分号结尾
        "import/no-dynamic-require": [0],
        "function-paren-newline": [0],
        "no-nested-ternary": [1],
        "prefer-promise-reject-errors": [0],
        "no-var": [0],
        "no-mixed-operators": [0],
        "radix": [1],
        // don't require .vue extension when importing
        'import/extensions': [0, 'always', {
          'js': 'never',
          'vue': 'never'
        }],
        "class-methods-use-this": [0],
        "import/prefer-default-export": [0],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};