const fs = require('fs')
const path = require('path')
function getRootPath(dir) {
    return path.join(__dirname, dir)
}
function isFileDirectory(path, name) {
    const p = getRootPath(`${path}/${name}`)
    const d = fs.statSync(p)
    return d.isDirectory()
}
const basePath = "./views"
function handler(path) {
    let filePath = getRootPath(path)
    let modules = fs.readdirSync(filePath);
    //过滤出$文件夹
    modules = modules.filter(item => {
        const isDirectory = isFileDirectory(path, item)
        return isDirectory && item.includes('$')
    })
    const res = generateDir(modules, path)
    console.log(JSON.stringify(res))
}
function isRootRoute(path) {
    return !!(path.split('/').length <= 2)
}
function generateDir(arr, base) {
    let res = arr.reduce((acc, cur) => {
        //相对路径
        let path = base + '/' + cur
        //首先 为模块创建路由对象
        let routePath = '/' + path.slice(8, path.length).replace(/\$/g, '')
        let routeName = cur.replace(/\$/g, '')
        const route = {
            path: routePath,
            name: routeName,
            component: isRootRoute(routePath) ? `()=>import(/* webpackChunkName: "${routeName}" */'@${path.slice(1, path.length)}/index.vue')` : `()=>import('@${path.slice(1, path.length)}/index.vue')`,
        }
        //
        let filePath = getRootPath(path)
        const modules = fs.readdirSync(filePath);
        //过滤出$文件夹
        const dir = modules.filter(item => {
            const isDirectory = isFileDirectory(path, item)
            return isDirectory && item.includes('$')
        })
        if (dir.length) {
            const children = generateDir(dir, path)
            route.children = children
        }
        acc.push(route)
        return acc
    }, [])
    return res
}
handler(basePath)
