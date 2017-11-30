const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = merge(commonConfig, {
    devtool: "source-map", //takes some memory, but useful for debugging
    entry: {
        vendor: [
            "react" //It's also good practice to extract third-party libraries, such as lodash or react,
                    // to a separate vendor chunk as they are less likely to change than our local source code.
                    // This step will allow clients to request even less from the server to stay up to date.
        ]
    },
    plugins: [
        /*new webpack.DefinePlugin({
            //NODE_ENV is a system environment variable that Node.js exposes into running scripts.
            // It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries.
            'process.env.NODE_ENV': JSON.stringify('production')
        }),*/
        //this plugin avoids situation when we add new module, and do rebuild,
        //after this hash of vendor chunk is changed, due module ids were changed,
        //to prevent such situations we use this plugin, it causes hashes to be based on relative paths of the module
        new webpack.HashedModuleIdsPlugin(),


        //order matters, vendor should be before runtime
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' //chunk with libraries, that more likely will no be changed a lot of time
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime' // this name isn't specified in the entry configuration =>
                            //runtime.bundle.js will contain webpack's boilerplate and manifest which can change with every build
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
           template: path.resolve(__dirname, 'src', 'index-t.ejs'),
           filename: 'index.html'
        })
    ]
});

//console.log(JSON.stringify(prodConfig, null, 4));
module.exports = prodConfig;

