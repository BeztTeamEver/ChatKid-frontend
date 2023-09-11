module.exports = {
  ...require("eslint-config-mantine/.prettierrc.js"),
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  endOfLine: "auto",
  importOrder: ["^@core/(.*)$", "^@hooks/(.*)$", "^@components/(.*)$", "^[./]"],
  importOrderSeparation: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
