
const container = document.querySelector('.container');
let arr = Array.from(container.children)
function change() {
    const childrens = [...arr]
    for (let i = 0, l = childrens.length; i < l; i++) {
        const children = childrens[i]
        const j = Math.floor(Math.random() * l)
        if (i !== j) {
            // 获取当前dom的下一个元素
            const inextDom = children.nextElementSibling
            // 把i插入j之前
            container.insertBefore(children, childrens[j])
            // 把下标j的元素插入到i元素之前
            container.insertBefore(childrens[j], inextDom)
        }
    }
}
sort.onclick = () => {
    record(arr)
    change()
    move(arr)
}

function record(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        const dom = arr[i]
        const rect = dom.getBoundingClientRect()
        dom.startX = rect.left
        dom.startY = rect.top
    }
}

function move(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        const dom = arr[i]
        const rect = dom.getBoundingClientRect()
        const curX = rect.left, curY = rect.top
        dom.animate([
            { transform: `translate(${dom.startX - curX}px, ${dom.startY - curY}px)` },
            { transform: `translate(0px, 0px)` }
        ], { duration: 600 })
    }
}