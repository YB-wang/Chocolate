// 直角三角形  知道两个角的角度 和直角边的长度L 返回  两个直角边的长度

function 角度转弧度(角度) {
    return parseFloat(角度 * Math.PI / 180).toFixed(10)

}
function 弧度转角度(弧度) {
    return parseFloat(弧度 * 180 / Math.PI).toFixed(10)
}
function trianglet(angel, L) {
    console.log('角度:', angel)
    angel = 角度转弧度(angel)
    console.log('弧度:', angel)
    let h = L * Math.sin(angel)
    let b = L * Math.cos(angel)

    return {
        h, b
    }
}

console.log(trianglet(30, 6))