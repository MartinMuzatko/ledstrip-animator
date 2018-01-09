module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'html',
        'import'
    ],
    "settings": { "import/parser": "babel-eslint" },
    globals: {
        'cordova': true,
        'DEV': true,
        'PROD': true,
        '__THEME': true
    },
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        'one-var': 0,
        'no-floating-decimal': 0,
        'indent': [0, 4],
        'no-tabs': 0,
        'no-unexpected-multiline': 0,
        'import/first': 0,
        'import/named': 0,
        'import/namespace': 0,
        'import/default': 2,
        'import/export': 2,
        'comma-dangle': 0,
        'space-before-function-paren': 0,
        'eqeqeq': 0,
        'no-new': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    }
}
