function Person(name,age) {
    this.name = name
    this.age = age
}
let p1 = new Person('李四',18);


function createPerson(...args) {
    let obj = Object.create(Person.prototype)
    Person.call(obj,...args)
    return obj
}

let p2 = createPerson('张三',18)
console.log('p1',p1);
console.log('p2',p2);

