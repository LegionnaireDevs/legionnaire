import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import googleConfig from "eslint-config-google";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  googleConfig,
  prettierConfig,
  prettierPlugin,
  {
    rules: {
      "require-jsdoc": "off",
      "valid-jsdoc": "off",
    },
  },
];
