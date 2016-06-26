var path = require("path");

module.exports = {
  entry: [
    "./examples/index.js"
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel"
      }
    ]
  }
};
