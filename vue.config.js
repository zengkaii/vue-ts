// const devConfig = require('./dev/index.js')
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			'/': {
				target: 'http://localhost:4000',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
				  '^/': '/'
				}
			},
		}
	},
	chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
    },
    pluginOptions:{
		"style-resources-loader": {
			preProcessor: "less",
			patterns: [
				//这个是加上自己的路径，
				path.resolve(__dirname, "./src/assets/less/theme.less")
			]
		}
    },
}