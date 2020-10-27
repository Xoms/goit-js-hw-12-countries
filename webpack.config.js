const path = require('path'); //commonJS module from NodeJS чтоб можно было изменять пути к оутпуту 
//в версии 5+ чтоб испльзовать node модули в браузере, надо устанавливать path-browserify полифилл вручную.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",

    //mode: 'development', // или 'production', не надо, т.к. вызываем вебпак npm-скриптом с уже подставленным mode

    output: {  //если output нету, используются значения по умолчанию
        
        path: path.resolve(__dirname, './build'), //path.resolve - чтоб достуаться к корню проекта. по умолчанию 'dist'
        filename: 'bundle.js' //по умолчанию main.js
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000,
        open: true
      },
    //plugins
    plugins: [
        new MiniCssExtractPlugin({ //плагин для извлечения css из js в билд
            filename: 'style.css', //по умолчанию main.css
        }),
        new HtmlWebpackPlugin({//плагин для содания html с подключенными css и js в билде
            template: './src/index.html' //по умолчанию создаст пустой html со стандартной разметкой и подключенными css и js
        }), 
],
    //Loaders
    module: {
        rules: [
            {
                test: /\.m?js$/, 
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }                
            },
            {
                test: /\.css$/i,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `.сss` from JS strings
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
            { 
                test: /\.handlebars$/, 
                loader: "handlebars-loader" 
            }
        ]
    },
    
};