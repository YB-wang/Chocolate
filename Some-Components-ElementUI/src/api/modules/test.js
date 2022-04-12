import request from "/src/api/index.js"
const instance = request.instance
export function login(obj) {
    const option = {
        url: '/user/login',
        method: 'post',
        data: obj
    }
    return instance(option)
}
