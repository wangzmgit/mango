const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === "production" ? "/mango/" : "/",
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
};