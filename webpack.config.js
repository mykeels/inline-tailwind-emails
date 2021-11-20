const path = require("path");
const { SourceMapDevToolPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getSuffix = target => (target === "commonjs" ? "" : `.${target}`);

const createConfig = ({ libraryTarget }) => ({
  mode: process.env.NODE_ENV || "development",
  entry: {
    index: "./src/index.js"
  },
  target: "node",
  externals: {},
  output: {
    filename: `[name]${getSuffix(libraryTarget)}.js`,
    path: path.resolve(__dirname, "dist"),
    library: "",
    libraryTarget,
    globalObject: "this"
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: []
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  include: [
                    "@babel/plugin-proposal-optional-chaining" // parsing fails on optional operator without this
                  ]
                }
              ]
            ]
          }
        }
      }
    ]
  }
});

module.exports = [
  createConfig({
    libraryTarget: "commonjs"
  })
];
