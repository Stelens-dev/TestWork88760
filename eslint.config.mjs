import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import eslintNext from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommended,
      js.configs.recommended,
      pluginPrettier,
    ],
    ignores: [".next", "eslint.config.mjs", "next-env.d.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    plugins: {
      "@next/next": eslintNext,
      "@stylistic": stylistic,
    },
    rules: {
      ...eslintNext.configs.recommended.rules,
      "@stylistic/quotes": [
        "error",
        "double",
        { allowTemplateLiterals: "always" },
      ],
      "@stylistic/semi": ["error", "always", { omitLastInOneLineBlock: true }],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  },
]);
