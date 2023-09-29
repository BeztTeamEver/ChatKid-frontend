module.exports = {
  extends: [
    "plugin:prettier/recommended",
    "mantine",
    "plugin:@next/next/recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],

  plugins: ["storybook", "unused-imports"],
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.css'],
  },

  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "@typescript-eslint/no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/self-closing-comp": "off",
    "react/jsx-props-no-spreading": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "unused-imports/no-unused-imports": "error",
    "no-param-reassign": 0,
    "import/no-useless-path-segments": "off",
    "import/order": "off",
    "import/extensions": "off",
    "react/button-has-type": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          String: false,
          Boolean: false,
          Number: false,
          Symbol: false,
          "{}": false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
  },
};
