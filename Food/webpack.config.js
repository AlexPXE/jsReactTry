const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'), //Контекст работы webpack (тут устанавливаем обсалютный путь), т.е. путь к директории с исходниками
    mode: 'development',             //Режим работы webpack по умолчанию
    entry: './js/main.js',           //entry point files (если несколько, то указываем как объект entry:{name1:....,name2...,...})
    output: {                        //Директория выгрузки 
        path: path.resolve(__dirname, 'dist'), //абсолютный путь
        filename: '[name][contenthash].js', //имя бандла (конечный файл). [патэрн имени(на случай если файлов в entry point несколько)][хэш файла].js
        assetModuleFilename: 'assets/[hash][ext][query]', //путь в папке dist для ресурсов(в данном случае для картинок)
        clean: true //очистка dist при сборке от мусора
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name][contenthash].css'}),
        new HTMLWebpackPlugin({template: './index.html'}), //плагин для работы с html (парамтр: путь к файлу html)        
    ],
    module:{    //loaders (загрузчики), нужны для работы с различными файлами отличными от js, json (картинки, стили и т.д.)
        rules:[
            {
                test: /\.html$/i, //Обрабатывает html (картинки из html будут скомпилены в папку dist)
                loader: "html-loader",
            },            
            {                
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ],
                
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
           /* {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] //настройка babel(package.json)
                    }
                }
            } */       
        ]        
    }
};



