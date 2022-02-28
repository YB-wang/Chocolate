Promise._all = function (array) {
    const results = []
    let successNum = 0
    //返回一个Promsie实例
    return new Promise((resolve, reject) => {
        //遍历对每个元素单独处理
        for (let i = 0; i < array.length; i++) {
            const item = array[i]
            //判断item是不是Promise实例   不是的话直接作为成功的结果
            if (item.constructor === Promise) { //Yes
                item.then(data => {
                    //直接push是错误的  因为是异步操作直接push顺序会被打乱
                    results[i] = data
                    //异步结束的标志 ？   //不可以通过length来判断
                    successNum++
                    if (successNum === array.length) {
                        resolve(results)
                    }
                }, reject)
            } else {//Node
                results[i] = data
            }
        }

    })
}

Promise._race = function (array) {
    return new Promise((resolve,reject)=>{
        for(let i =0 ;i<array.length ;i++){
            const item = array[i]
            if(Object.prototype.toString.call(item)==='[object Promise]'){
                item.then(resolve,reject)
            }else{
                resolve(item)
            }
        }
    })
}

//将成功和失败分为两个数组返回出去
Promise._betterAll = function (array) {
    let successNum = 0;
    let failNum = 0;
    const success = []
    const fail = []
    //返回一个Promsie实例
    return new Promise((resolve, reject) => {
        //遍历对每个元素单独处理
        for (let i = 0; i < array.length; i++) {
            const item = array[i]
            //判断item是不是Promise实例   不是的话直接作为成功的结果
            if (item.constructor === Promise) { //Yes
                item.then(data => {
                    // results.push(data) // 直接push是错误的  因为是异步操作直接push顺序会被打乱
                    success.push(data)
                    successNum++
                    if (successNum + failNum === array.length) {
                        resolve({
                            success,
                            fail
                        })
                    }
                }, (err) => {
                    fail.push(err)
                    failNum++
                    if (successNum + failNum === array.length) {
                        resolve({
                            success,
                            fail
                        })
                    }
                })
            } else {//Node
                results[i] = data
            }
        }
    })
}

const delay = (player, duration) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolve:' + player)
            reject('reject:' + player)
        }, duration)
    })
}

const p1 = delay('1', 500);
const p2 = delay('2', 700);
const p3 = delay('3', 900);
const p4 = delay('4', 1100);
const p5 = delay('5', 1300);
const p6 = delay('6', 1500);
const arr = [p1, p2, p3, p4, p5, p6]
// Promise._betterAll(arr).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })




