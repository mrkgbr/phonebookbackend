module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double"],
    "no-console": "off",
    "no-unused-vars": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
  },
};
