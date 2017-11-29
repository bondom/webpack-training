const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//****Code splitting*****
// 1. Entry points and preventing duplication
// 2. Dynamic imports: splitting code via inline function calls within modules with using import() or require.ensure

module.exports = {
    context: __dirname, //__dirname - Node.js utility variable - it is the directory name of the current file.
    entry: {
        // two bundles will be produced: index.bundle.js and another.bundle.js
        //Pitfalls(if there is no additional plugin line CommonsChunkPlugin):
        // - If there are any duplicated modules between entry chunks they will be included in both bundles.
        // - It isn't as flexible and can't be used to dynamically split code with the core application logic.
        index: path.join(__dirname, "src","/index.jsx"),
        another: path.join(__dirname, "src","/another.jsx")
    },
    output: {
        path: path.join(__dirname, "/build"),
        filename: "[name].[chunkhash].js",
        publicPath: '/' //It is recommended that devServer.publicPath is the same as output.publicPath.
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},//2)then styles will be applied to page
                    {loader: 'css-loader'} //1) transformation will be applied to files with extension .css to convert text
                ]
            },
            {
                enforce: "pre", //checking source files, not modified by other loaders
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true
                }
            },
            {//for Babel v6 and babel-loader v7
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                include: [
                    path.resolve(__dirname,"src")
                ],
                loader: "babel-loader",
                options: {
                    presets: [ ["react"], ["es2015", { modules: false }]]
                }
            },
/*            {//for index.html file, as another option CopyWebpackPlugin can be used
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },*/
            {
                test: /\.(png|jpg)/,
                use: [
                    'file-loader?name=assets/img/[name].[ext]'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']), //cleans build folder before every run
        /*new webpack.optimize.CommonsChunkPlugin({//extracts common dependencies into existing entry chunk or entirely new chunk
            name: 'common'
        }),*/

    ]

}

