
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// to change content of config file depending on prod or dev, we need access to variables
// to check. therefore best to export as a function which will return an object, rather than export object
module.exports = (env) => {
    // if env not eq 'production', webpack runs without production optimisiation
    const isProduction = env === 'production'; // check if eq production
    const CSSExtract = new ExtractTextPlugin('styles.css'); // name of the css file parsed

    return {
        entry: './src/app.js',
        // entry: './src/playground/hoc.js', // this for testing separate files
        // __dirname, follows folder name e.g. public, dist eqv to public/dist
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', // use diff source map for prod or dev
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};
