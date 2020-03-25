const devConfig = require('./dev/index.js')
const path = require('path')
module.exports = {
    ...devConfig,
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