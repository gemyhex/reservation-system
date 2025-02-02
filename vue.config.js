module.exports = {
    devServer: {
        hot: false,
        liveReload: true,
        proxy: {
            '/*': {
                target: 'https://api.foodics.dev/v5',
                changeOrigin: true,
            }
        }
    }
}