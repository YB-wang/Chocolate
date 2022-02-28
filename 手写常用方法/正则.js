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
