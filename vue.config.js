const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = {
  chainWebpack: config => {
    config.module.rule("raw").
        test(/\.txt$/).
        use("raw-loader").
        loader("raw-loader")
        .end();
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new MonacoWebpackPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
  },
  css: {
    extract: false,
  },
  publicPath: "",
  transpileDependencies: ["vuex-module-decorators"],
};
