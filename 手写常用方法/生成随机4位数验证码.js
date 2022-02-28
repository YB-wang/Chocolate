/*
    思路：
    1、得到相应字符的ASCII码值
    2、通过ASSCII吗值得到相应的字符串：String.fromCharCode(ASCII码)
    3、循环四次
    4、拼接
    5、返回结果
*/

/*
    '0' - '9' : 48-57
    'A' - 'Z' : 65-90
    'a' - 'z' : 97-122
*/
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
export function getVerifyCode() {
    let str = ''
    for (let i = 1; i <= 4; i++) {
        const ascii = getRandom(48, 122)
        if ((ascii > 57 && ascii < 65) || (ascii > 90 && ascii < 97)) {
            //不符合要求的值 此次循环无效
            i--
            //结束此次循环
            continue
        }
        str += String.tofromCharCode(ascii)
    }
    return str
}