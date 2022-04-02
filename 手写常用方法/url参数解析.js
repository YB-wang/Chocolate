//重复出现的key要组装成数组 
//能被转成数字的就转成数字类型
//中文需要解码
//未指定的key约定为true
let _url = 'https://www.bilibili.com/v/kichiku/?spm_id_from=333.1007.0.0&aaa=666&bbb=ccc'
function urlParser(url) {
    //1、获取？后的字符串信息
    //2、根据不同的信息做不同的解析
    const [, search] = url.split('?')
    
    const arr = search.split('&')
  
    //
    let res=arr.reduce((acc, cur) => {
        if (cur.includes('=')) {
            let [key, value] = cur.split('=')

            //中文解码
            value = decodeURIComponent(value)
            //数字进行隐式转换
            value = /^d+$/.test(value) ? +value : value

            //数组收集
            if (acc.hasOwnProperty(key)) {
                //表明这个key出现过需要转化为数组
                acc[key]=[].concat(accu[key],value)
            }else{
                acc[key]=value
            }
        } else {
            //没有 =  直接为 true
            acc[cur] = true
        }
    }, {})
    return res
}

console.log('url参数解析',urlParser(_url));