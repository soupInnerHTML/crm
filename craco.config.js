const path = require('path');
module.exports = {
    webpack: {
        alias: {
            '@views': path.resolve(__dirname, 'src/mvvm/views'),
            '@models': path.resolve(__dirname, 'src/mvvm/models'),
            '@viewModels': path.resolve(__dirname, 'src/mvvm/viewModels'),
            '@library': path.resolve(__dirname, 'src/componentsLibrary'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@services': path.resolve(__dirname, 'src/services'),
            "@utils": path.resolve(__dirname, 'src/utils'),
            '@animations': path.resolve(__dirname, 'src/assets/animations'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
        },
        configure: (webpackConfig) => {
            webpackConfig.module.rules.push({
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        "babel-plugin-transform-typescript-metadata",
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                        ['lodash'],
                    ],
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                },
            });
            return webpackConfig;
        },
    },
};
