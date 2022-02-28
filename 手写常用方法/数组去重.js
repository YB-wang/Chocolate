import { refuseChange } from './utils.js'
export const $Array = refuseChange({
    uniqueBySet: (arr) => {
        return [...new Set(arr)]
    },
    uniqueByReduce: (arr) => {
        return arr.reduce(function (acc, cur) {
            console.log(acc, cur);
            if (acc.findIndex(item => item === cur) < 0) {
                acc.push(cur)
            }
            return acc
        }, [])
    },
    uniqueByObject:(arr)=>{
        let res = arr.reduce((acc,cur)=>{
            if(!acc[cur]){
                acc[cur]=cur
            }
            return acc
        },{

        })
        return Object.values(res)
    }
})
