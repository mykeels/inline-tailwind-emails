module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    browser: true,
    "jest/globals": true
  },
  rules: {
    "no-console": "off",
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/order": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "simple-import-sort", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  globals: {
    it: true,
    expect: true,
    test: true,
    beforeEach: true,
    beforeAll: true,
    afterEach: true,
    afterAll: true,
    _: true
  },
  overrides: [
    {
      files: "server/**/*.js",
      env: { node: true },
      rules: {
        "simple-import-sort/sort": "off",
        "import/order": ["error", { "newlines-between": "always" }]
      }
    }
  ],
  ignorePatterns: ["node_modules/"]
};
