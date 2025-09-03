import { defineConfig } from "eslint/config";
import { globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import eslintNext from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  globalIgnores([".next"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommended,
      js.configs.recommended,
      pluginPrettier,
    ],
    ignores: [
      ".next",
      "eslint.config.mjs",
      "next-env.d.ts",
      "src/stores/useStore.ts",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        process: "readonly",
        React: "readonly",
      },
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
