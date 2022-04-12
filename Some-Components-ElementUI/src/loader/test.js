const fs = require('fs')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
function isFileDirectory(path, name) {
    const d = fs.statSync(path.join(__dirname, `${path}/${name}`))
    return d.isDirectory()
}
function handler(filePath = resolve('../views')) {
    let res = fs.readdirSync(filePath);

    res = res.map((file) => {
        const [name, ext] = file.split('.')
        return { name, ext };
    });
    let str = `
    export const route = [
            `;
    res.forEach(route => {
        const { name } = route
        str += `
                    {
                        path:'/${name}',
                        name:'${name}',
                        component:() => import(/* webpackChunkName: "${name}" */'@/views/${name}.vue'),
                        meta:{
                            title:'${name}'
                        }
                    },
                `
        return str
    });

    str += `
                ]
            `;
    return str
}
handler()
// module.exports = function (ctx) {
//     //将views文件夹添加为依赖 随时热更新
//     this.addContextDependency(resolve('../views'))
//     ctx = handler()
//     /*
//         这里不能作文件写入操作  因为 .js 文件 是其他loader的依赖文件
//         写入文件 =》 依赖更新 =》 重新编译 =》 loader处理 =》  调用该loader =》 写入文件
//         fs.writeFileSync(resolve('../router/route.config.js'), handler(), 'utf-8');
//     */

//     return ctx
// }


// 结论 loader 在 run serve 和 run build 的时候都有作用  但是无法进行写入操作 导致 文件看起来是空的