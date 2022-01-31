module.exports = {
    externals: {
        antd: 'antd',
        lodash: 'lodash',
        react: 'react',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    }
};
