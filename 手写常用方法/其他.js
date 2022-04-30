var name = 1
function test() {
    var name = 2;
    console.log(name);
    console.log(this.name);
}

let arr = ['wang', 'zi', 'qiang']
delete arr.length
console.log(Object.fromEntries(arr))

