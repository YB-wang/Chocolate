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
function isRootRoute(path) {
  return !!(path.split('/').length <= 2)
}
function handler(path) {
  let filePath = getRootPath(path)
  let modules = fs.readdirSync(filePath)
  //过滤出$文件夹
  modules = modules.filter(item => {
    const isDirectory = isFileDirectory(path, item)
    return isDirectory && item.includes('$')
  })
  let res = JSON.stringify(generateDir(modules, path))
  // 去掉一层引号 component 才能被识别为函数
  res = res.replace(/(?<="component":).*?(?=\}|,)/g, function() {
    let str = arguments[0]
    str = str.slice(1, str.length - 1)
    return str
  })
  res = 'export const route = ' + res
  return res
}
// const basePath = './views'
// const pathSliceLength = 7
// const componentSliceLength = 1
const basePath = '../views'
const pathSliceLength = 8
const componentSliceLength = 2

function generateDir(arr, base) {
  let res = arr.reduce((acc, cur) => {
    //相对路径
    let path = base + '/' + cur
    //根路径
    let filePath = getRootPath(path)
    //目录下所有文件和文件夹
    const modules = fs.readdirSync(filePath)
    let meta = ''
    if (modules.includes('meta.json')) {
      meta = fs.readFileSync(
        getRootPath(path + '/meta.json'),
        'utf-8',
        function(err, data) {
          if (err) {
            return ''
          } else {
            return data
          }
        }
      )
      meta = JSON.parse(meta)
    }

    //首先 为模块创建路由对象
    let routePath = path.slice(pathSliceLength, path.length).replace(/\$/g, '')
    let routeName = cur.replace(/\$/g, '')
    const route = {
      path: routePath,
      name: routeName,
      meta: meta === '' ? {} : meta,
      // meta: JSON.parse(meta),
      component: isRootRoute(routePath)
        ? `()=>import('@${path.slice(
            componentSliceLength,
            path.length
          )}/index.vue')`
        : `()=>import('@${path.slice(
            componentSliceLength,
            path.length
          )}/index.vue')`,
    }
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

module.exports = function(ctx) {
  //将views文件夹添加为依赖 随时热更新
  this.addContextDependency(getRootPath(basePath))
  ctx = handler(basePath)
  /*
        这里不能作文件写入操作  因为 .js 文件 是其他loader的依赖文件 
        写入文件 =》 依赖更新 =》 重新编译 =》 loader处理 =》  调用该loader =》 写入文件
        fs.writeFileSync(resolve('../router/route.config.js'), handler(), 'utf-8');
    */

  return ctx
}

// 结论 loader 在 run serve 和 run build 的时候都有作用  但是无法进行写入操作 导致 文件看起来是空的
