const version = require('../package.json')
const titles = {
    system: { // 这里配置有哪些文件入口 project下的
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'ts-admin v' + version.version,
    },
}

module.exports = (config) => {
    const runPages = {}
    let pages = config.pages
    console.log('pages1',pages)
    if (!pages) {
        pages = Object.keys(titles)
        console.log('pages2',pages)
    }
    if (typeof pages == 'string') {
        pages = [pages]
        console.log('pages3',pages)
    }
    pages.filter(key => {
        if (!titles[key]) {
            console.warn(`${key} pages title no found`)
        }
        return titles[key]
    }).forEach(key => {
        runPages[key] = {
            entry: `src/project/${key}/main.ts`,
            template: 'public/index.html',
            filename: `${key}/index.html`,
            title: titles[key].title
        }
    })
    console.log('runPages',runPages)
    return runPages
}
