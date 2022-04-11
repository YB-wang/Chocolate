//  then方法注册回调的操作是同步的 then方法注册的回调会在前面的promise resolve 之后放入微任务队列
function handler() {
    const p = new Promise((resolve, reject) => {
        console.log("log: 外部promise");
        resolve();
    })
        .then(() => {
            console.log("log: 外部第一个then");
            new Promise((resolve, reject) => {
                console.log("log: 内部promise");
                resolve();
            })
                .then(() => {
                    console.log("log: 内部第一个then");
                })
                .then(() => {
                    console.log("log: 内部第二个then");
                });
        })
        .then(() => {
            console.log("log: 外部第二个then");
        }).then(() => {
            console.log("log: 外部第三个then");
        })
    return p
}
handler()
