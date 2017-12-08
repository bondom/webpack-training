const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//extracts css in separate file, it is faster on loading because css and js are loaded in parallel
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"//if plugin is disabled fallback(see below) is used
});

//****Code splitting*****
// 1. Entry points and preventing duplication
// 2. Dynamic imports: splitting code via inline function calls within modules with using import() or require.ensure

module.exports = {
    //context - The base directory, an absolute path, for resolving entry points and loaders from configuration.
    context: path.resolve(__dirname, 'src'), //__dirname - Node.js utility variable - it is the directory name of the current file.
    entry: {
        // two bundles will be produced: index.bundle.js and another.bundle.js
        //Pitfalls(if there is no additional plugin line CommonsChunkPlugin):
        // - If there are any duplicated modules between entry chunks they will be included in both bundles.
        // - It isn't as flexible and can't be used to dynamically split code with the core application logic.
        index: "./index.jsx",
        another: "./another.jsx"
    },
    output: {
        path: path.join(__dirname, "/build"),
        filename: "[name].[chunkhash].js",
        publicPath: "/" //It is recommended that devServer.publicPath is the same as output.publicPath.
    },
    resolve: {
        //path.resolve(__dirname, "src") - allows absolute imports
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }],
                    // use style-loader in development
                    fallback: "style-loader" // creates style nodes from JS strings(Adds CSS to the DOM by injecting a <style> tag)
                })
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
                    //modules is false to avoid converting static ES6 import and export into dynamic ones => Tree Shaking works
                    presets: [ ["react"], ["es2015", { modules: false }]],
                    babelrc: false //to get rid of using .babelrc file that is used by jest
                }
            },
/*            {//for index.html file, as another option CopyWebpackPlugin can be used
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },*/
            {
                test: /\.(png|jpg)/,
                use: [
                    'file-loader?name=[path][name].[ext]'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: path.resolve(__dirname, "src/assets/fonts"),
                use: [
                    'file-loader?name=[path][name].[ext]'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']), //cleans build folder before every run
        new webpack.DefinePlugin({ //is sufficient for React 16(if we use React 15 Environment Plugin should be used to improve performance)
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        /*new webpack.optimize.CommonsChunkPlugin({//extracts common dependencies into existing entry chunk or entirely new chunk
            name: 'common'
        }),*/

        extractSass

    ]

}

