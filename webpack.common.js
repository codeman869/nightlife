var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './app/src/App.js',
    output: {
        path: path.resolve(__dirname,'public/js' ),
        filename: 'app.bundle.js',
        
    },
    module: {
        /*loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }     
        ] */
        rules: [{
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
            ]
                
            
        },
        {
            test: /\.(jsx|js)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'es2015', 'react'],
                    plugins: ['transform-decorators-legacy']
                }
            }
        }]
    },
    stats: {
        colors: true
    },
    
}