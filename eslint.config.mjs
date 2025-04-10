import { defineConfig } from "eslint/config";
import globals from "globals";
import js from '@eslint/js'
import stylistcJs from '@stylistic/eslint-plugin-js'


export default defineConfig(
  js.configs.recommended,
  [
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
    
  ],
  {
    plugins:{
      '@stylistic/js' : stylistcJs
    },
    rules:{
      '@stylistic/js/indent' : ['error',2],
      '@stylistic/js/linebreak-style' : ['error','unix'],
      '@stylistic/js/qoutes' : ['error','single'],
      '@stylistic/js/semi' : ['error','never']
    }
  }
);