let path = require('path');

module.exports = {
    mode : "development",
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname + '/public'),
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        port: 1337,
        open: true,
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
};