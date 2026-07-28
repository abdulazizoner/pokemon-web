import js from "@eslint/js";
import globals from "globals";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/", ".astro/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }] },
  },
];
