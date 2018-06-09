module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb-base"
    ],
    "plugins": [
        "import",
    ],
    "rules": {
        "default-case": [0],
        // Everything is nicely spaced with 4 spaces
        "indent": [1, 4, {
            "SwitchCase": 1
        }],
        "no-console": [0],
        "import/extensions": [2, "never"],
        "import/no-extraneous-dependencies": [0]
    }
};