const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js", //INSERT ENTRY POINT FILE HERE//
    output: {
        filename: "main.js", //OUTPUT FILE HERE. SHOULD ALWAYS BE MAIN.JS//
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
      watchFiles: ["./src/homepage.html"],  //INSERT HTML FILE HERE//
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/homepage.html", //INSERT HTML FILE HERE//
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
};
