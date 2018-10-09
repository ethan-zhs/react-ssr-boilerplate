
const hooks = () => {
    require('babel-polyfill');

    // Javascript require hook
    require('babel-register')({
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports', 'transform-decorators-legacy', 'transform-runtime']
    });

    require('css-modules-require-hook')({
        extensions: ['.less'],
        camelCase: true,
        generateScopedName: '[name]__[local]___[hash:base64:5]'
    });
    
    require('css-modules-require-hook')({
        extensions: ['.css'],
        camelCase: true,
        generateScopedName: '[name]__[local]___[hash:base64:5]'
    });

    // Image require hook
    require('asset-require-hook')({
        name: 'images/[name][hash:8].[ext]',
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'ico', 'woff', 'woff2', 'eot', 'ttf', 'svg', 'swf'],
        limit: 4000,
    });
};

module.exports = hooks;
