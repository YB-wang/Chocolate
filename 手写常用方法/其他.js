var name = 1
function test(){
    var name =2;
    console.log(name);
    console.log(this.name);
}
test()