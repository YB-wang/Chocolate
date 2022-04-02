function multiply2(num) {
    return num * 2
}
function multiply3(num) {
    return num * 3
}
function multiply4(num) {
    return num * 4
}

function compose(...fns){
    return arg =>fns.reduceRight((prev,fn)=>{
        return fn(prev)
    },arg)
}

function pipe(...fns){
    return arg =>fns.reduce((prev,fn)=>{
        console.log(prev)
        return fn(prev)
    },arg)
}


console.log(compose(multiply2,multiply3,multiply4)(3));
console.log(pipe(multiply2,multiply3,multiply4)(3));

