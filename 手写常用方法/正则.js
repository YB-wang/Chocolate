/* 
    正则:
    匹配符:
    匹配单个字符时 直接在字符后面使用限定符  
    匹配多个字符时 使用 （） 包裹字符在进行匹配
    ?:匹配 0 或 1个 
    *：匹配 0 或 多个 >=0
    +：匹配 1 或 多个 >=0
    {2,6} : 出现 2-6次
    {2}:2次及以上

    ‘hu’
*/

const path = require('path')
const fs = require('fs')


const renderTemplate = (filePath, obj, cb) => {
    fs.readFile(filePath, 'utf8', function (err, html) {
        html = html.replace(/\{\{([^}]+)\}\}/g, function () {
            let key = arguments[1].trim()
            return obj[key]
        })
        cb(err, html)
    })
}

renderTemplate(path.resolve(__dirname, 'index.html'), {
    name: 'wang',
    age: 18,
    sex: '男'
}, function (err, data) {
    console.log(data);
})
