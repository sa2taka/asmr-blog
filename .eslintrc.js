module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:nuxt/recommended',
  ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'import/no-mutable-exports': 'off',
    'vue/no-v-html': 'off',
  },
  ignorePatterns: ['static/', 'node_modules/', '.nuxt/'],
};
