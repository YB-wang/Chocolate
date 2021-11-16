


//时间戳处理函数 分钟/30天/完整日期
function dealtime(date = new Date) {
    function setTwo(value) {
        if (value < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }
    //现在的时间
    let nowtime = new Date();
    //输入时间
    let mytime = new Date(date);
    //时间差
    let poor = new Date(nowtime - mytime);
    let poorYear = poor.getFullYear() - 1970;
    let poorMonth = poor.getMonth() + 1 - 1;
    let poorDay = poor.getDate() - 1;
    let poorHour = poor.getHours() - 8;
    let poorMinutes = poor.getMinutes();
    let myYear = setTwo(mytime.getFullYear());
    let myMonth = setTwo(mytime.getMonth() + 1);
    let myDay = setTwo(mytime.getDate());
    let myHours = setTwo(mytime.getHours());
    let myMinutes = setTwo(mytime.getMinutes());
    let mySeconds = setTwo(mytime.getSeconds());
    if (poorYear > 0) {
        let temp = `${myYear}/${myMonth}/${myDay}`;
        return temp;
    } else if (poorMonth > 0) {
        let temp = `${myYear}/${myMonth}/${myDay}`;
        return temp;
    } else if (poorDay >= 14) {
        let temp = `${myYear}/${myMonth}/${myDay}`;
        return temp;
    } else if (poorDay >= 7 && poorDay < 14) {
        let temp = `一周前`;
        return temp;
    } else if (poorDay >= 1 && poorDay < 7) {
        let temp = `${poorDay}天前`;
        return temp;
    } else if (poorDay < 1 && poorHour >= 1) {
        let temp = `${poorHour}小时前`;
        return temp;
    } else if (poorMinutes > 5) {
        let temp = `${poorMinutes}分钟前`;
        return temp;
    } else {
        let temp = `刚刚`;
        return temp;
    }
}


//自定义alert 提示框
let myalert_timer = null;

function myalert(str, state) {
    return new Promise(resolve => {
        if (myalert_timer) {
            clearTimeout(myalert_timer);
        }
        if (document.getElementById('myalert')) {
            document.body.removeChild(document.getElementById('myalert'));
        }
        let myalert = document.createElement('div');
        myalert.setAttribute('id', 'myalert');
        let text = document.createElement('div');
        text.setAttribute('id', 'myalert_text');
        if (state == 'true') {
            myalert.style.background = '#DFF0D8';
            myalert.style.color = '#3D763E';
            myalert.style.border = 'solid 1px #D6E9C6';
            text.innerHTML = `<span style="color: #2C552D; font-weight:600; margin-right:10px;">Success:</span>${str}`;
        } else {
            myalert.style.background = '#F2DEDE';
            myalert.style.color = '#A94543';
            myalert.style.border = 'solid 1px #EBCCD1';
            text.innerHTML = `<span style="color: #843635; font-weight:600;margin-right:10px;">Error:</span>${str}`;
        }
        myalert.appendChild(text);
        myalert_timer = setTimeout(() => {
            document.body.removeChild(document.getElementById('myalert'));
            clearTimeout(myalert_timer);
            resolve();
        }, 1000)
        document.getElementsByTagName('body')[0].appendChild(myalert);
    });
}
//自定义提示框 黑色半透明背景
function myalert2(str, state) {
    return new Promise(resolve => {
        if (myalert_timer) {
            clearTimeout(myalert_timer);
        }
        if (document.getElementById('myalert')) {
            document.body.removeChild(document.getElementById('myalert'));
        }
        let myalert = document.createElement('div');
        myalert.setAttribute('id', 'myalert');
        let div = document.createElement('div');
        myalert.appendChild(div);
        let img = document.createElement('img');
        if (state == 'true') {
            img.src = "./image/myalert对.png";
        } else {
            img.src = "./image/myalert错.png";
        }
        div.appendChild(img);
        let text = document.createElement('div');
        text.innerText = str;
        text.setAttribute('id', 'myalert_text');
        myalert.appendChild(text);
        text.innerHTML = `${str}`;
        document.getElementsByTagName('body')[0].appendChild(myalert);
        myalert_timer = setTimeout(() => {
            document.body.removeChild(document.getElementById('myalert'));
            clearTimeout(myalert_timer);
            resolve();
        }, 1500)
    })
}

//form表单数据转换成对象形式
const formToObject = form =>
    Array.from(new FormData(form)).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value
        }), {}
    );
document.getElementById('btn').onclick = function () {
    console.log(formToObject(document.getElementById('myform')));
}

///将对象拼接成字符串
function qs(obj) {
    let str = "";
    for (let index of Object.keys(obj)) {
        str += `${index}=${obj[index]}&`;
    }
    str = str.substring(0, str.length - 1);
    return str;
}
//过滤歌词
function lrc(str) {
    return str.split(/\s*\n*\[.*?\]\s*/).filter(v => !!v);
}
//promise.all请求多个数据
Promise.all(
    [
        Promise.reject({
            code: 500,
            msg: "服务异常"
        }),
        Promise.resolve({
            code: 200,
            list: []
        }),
        Promise.resolve({
            code: 200,
            list: []
        })
    ].map(p => p.catch(e => e))
    // 核心内容是map方法，map的每一项都是promise，catch方法返回值会被promise.reslove()包裹，
    // 这样传进promise.all的数据都是resolved状态的。
)
    .then(res => {
        console.log("res=>", res);
    })
    .catch(error => {
        console.log("error=>", error);
    });
// 截取当前url参数 
function getUrlParams(url) {
    if (!url) {
        let url = window.location.href;
    }

    console.log(url);
    let temp = url.split("?");
    let pram = temp[1];
    let keyValue = pram.split("&");
    let obj = {};
    for (var i = 0; i < keyValue.length; i++) {
        var item = keyValue[i].split("=");
        var key = item[0];
        var value = item[1];
        obj[key] = value;
    }
    return obj;
}
//提取url的域名
function getUrlParams(url) {
    let urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}|(:[0-9]{1,4}))+\.?/;
    let arr = urlReg.exec(url);
    return arr[0];
}
//根据单击事件封装双击事
function onNodeDbClick(nodeObject) {
    //每次点击清除之前的定时器
    if (this.timer) {
        clearTimeout(this.timer);
    }
    //为第一次点击时 给firstClick赋值 为第二次则给secondClick赋值
    if (this.firstClick === null) {
        this.firstClick = nodeObject.id;
    } else {
        this.secondClick = nodeObject.id;
    }
    //每次点击都会抛出一个定时器 到规定时间后会重置两次点击的值
    this.timer = setTimeout(() => {
        this.firstClick = null;
        this.secondClick = null;
        clearTimeout(this.timer);
    }, 400);
    if (this.firstClick === this.secondClick && this.secondClick != null) {
        this.$router.push({
            path: `/personalRelationship/${this.firstClick}`,
        });
    }
}

//获取localStroage大小
function getLocalStroageSize() {
    return Object.entries(localStorage).map(v => v.join('')).join('').length;
}
//防抖
function betterDebounce(fn, delay) {
    let last = 0
    let timer = null
    return function () {
        let context = this
        let args = arguments
        let now = +new Date()
        if ((now - last) < delay) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(context, args)
                last = now
            })
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}