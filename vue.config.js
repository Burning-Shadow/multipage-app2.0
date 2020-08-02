module.exports = {
  publicPath: "./",
  outputDir: "front",
  pages: {
    consume: {
      entry: "src/pages/consume/main.js",
      template: "public/consume.html",
      filename: "consume.html"
    },
    home: {
      entry: "src/pages/home/main.js",
      template: "public/home.html",
      filename: "home.html"
    },
    index: {
      entry: "src/pages/index/main.js",
      template: "public/index.html",
      filename: "index.html"
    },
    product: {
      entry: "src/pages/product/main.js",
      template: "public/product.html",
      filename: "product.html"
    },
    topic: {
      entry: "src/pages/topic/main.js",
      template: "public/topic.html",
      filename: "topic.html"
    }
  },
  devServer: {
    port: 9090,
    proxy: "",
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
}