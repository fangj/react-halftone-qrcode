module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "react-halftone-qrcode.js",
    library: "HalftoneQRCode",
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: "babel"
      }
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs: "React",
      commonjs2: "React",
      amd: "React"
    }
  }
};
