function processAvgs() {
    const config = {}
    const mode = process.argv[2]
    if (mode == 'build') {
        config.pages = process.argv.slice(3)
    } else if (process.argv[3]) {
        const args = process.argv[3].split(' ')
        args.forEach(item => {
            if (item.indexOf('=') > -1) {
                let [key, value] = item.split('=')
                if (value.indexOf(',') > -1) {
                    value = value.split(',')
                }
                config[key] = value
            }
        })
    }
    console.log('config',config)
    console.log('process',process.argv[3])
    return config
}

const config = processAvgs()
const vueConfig = {
    pages: require('./pages-config')(config),
    devServer: {
        // proxy: require('./profile-config')(config),
        // proxy: 'http://localhost:8080',
        openPage: 'system',
        open: true
    }
}
console.log('vueConfig', vueConfig)
module.exports = vueConfig
