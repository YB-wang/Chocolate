
class Koa {
    constructor() {
        this.middlewares = []
    }
    use(callback) {//将callback全部存储起来
        this.middlewares.push(callback)
    }
    compose(ctx) {
        const dispatch = i => {
            if (i === this.middlewares.length) return Promise.resolve()
            let middleware = this.middlewares[i]
            // 如果中间件不是async 就会错误 await 只能接收Promise.resolve
            //调用next 就执行下一个中间件
            return Promise.resolve(middleware(ctx, () => dispatch(i + 1)))
        }
        return dispatch(0)
    }
    async send(msg) {
        const ctx = {
            num: 0
        }
        await this.compose(ctx) // 
        console.log(`经过${ctx.num}个中间件处理`)
    }
}

const app = new Koa()

app.use(async (ctx, next) => {
    ctx.num++
    console.log('1')
    await next()
    console.log('2')
})
app.use(async (ctx, next) => {
    ctx.num++
    console.log('3')
    await next()
    console.log('4')
})
app.use(async (ctx, next) => {
    ctx.num++
    console.log('5')
    await next()
    console.log('6')
})
app.use(async (ctx, next) => {
    ctx.num++
    console.log('7')
    await next()
    console.log('8')
})
app.send('')

// 1
// 3
// 5
// 7
// 8
// 6
// 4
// 2
// 经过4个中间件处理