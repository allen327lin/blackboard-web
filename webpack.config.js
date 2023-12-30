const path = require('path');

module.exports = {
    entry: './src/index.js',
    resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
          querystring: require.resolve("querystring-es3"),
          fs: false, // 如果你不需要fs模組，可以將它設為false
          zlib: false, // 如果你不需要zlib模組，可以將它設為false
          stream: require.resolve("stream-browserify"), // 如果你需要stream模組，引入相應的polyfill
          util: require.resolve("util/"), // 如果你需要util模組，引入相應的polyfill
          module: false, // 如果你不需要module模組，可以將它設為false
        }
      },      
    output: {
        filename: 'bundle.js', // 输出文件名
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // 添加处理样式文件的规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
