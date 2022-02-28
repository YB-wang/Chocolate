// 通过 Proxy 代理对象禁止对对象的修改
export const refuseChange = (target) => {
    const handler = {
        set: function (target, key, value) {
            throw new Error('禁止修改')
            // return
            // target[key] = value;
        },

        get: function (target, key) {

            return target[key]
        }
    }

    return new Proxy(target, handler)
}