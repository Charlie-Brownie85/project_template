module.exports = ({ file, options, env }) => ({
    parser: options.parser ? 'sugarss' : false,
    sourceMap: true,
    plugins: {
        'autoprefixer': {},
        'cssnano': env === 'production' ? {} : false,
    }
});