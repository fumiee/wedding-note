module.exports = {
  env: { es2021: true, browser: true, jest: true, node: true },
  plugins: ["import", "simple-import-sort", "react-hooks"], //importをアルファベット順に並べ替える
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "next",
    "next/core-web-vitals",
    "prettier",
    "plugin:import/recommended",
  ], //外部パッケージの指定をするとparserOptions,plugins,envなど他部分も描き変わる

  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json", sourceType: "module" }, //構文のルールの追加
  rules: {
    "no-console": ["error", { allow: ["warn", "info", "error"] }], //consoleは書かない
    "prefer-arrow-callback": "error", //アロー関数を使う
    "prefer-const": "error", //letよりconstを使う
    "arrow-body-style": ["off", "always"], //returnをつけよう
    "react/prop-types": "off", //typescriptの場合は不要
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react/destructuring-assignment": ["error", "never"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off", //hooksの第二引数が空などを検出
    "import/newline-after-import": "error", //importの後は１行空ける
    "import/no-default-export": "error", //defaultexportの使用
    "simple-import-sort/imports": "warn", //import文を並べ替える
    "simple-import-sort/exports": "warn", //export文を並べ替える
    "@typescript-eslint/no-explicit-any": "warn", //anyを明示的に使わない
    "@typescript-eslint/no-var-requires": "off", //importステートメントを除いてrequire禁止
    "@typescript-eslint/explicit-module-boundary-types": "off", //exportする関数の型の明記が必須
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error", //使っていない関数の検出
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "jsx-a11y/no-autofocus": "off", //autofocusの使用
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "import/no-cycle": "error",
  }, //アンダーバーをリンクじゃない所で使用しない
  overrides: [
    {
      files: ["src/pages/**/*.tsx", "src/pages/api/**/*.ts"],
      rules: { "import/no-default-export": "off" },
    }, //上記の拡張子ファイルもチェックの対象にする
  ],
};
