import Mock from 'mockjs'
const data = [];
const nameArr = ["项目名称一", "项目名称二", "项目名称三"];
const sexArr = ["男", "女", "未知"];
const typeArr = ["空气送检", "环境送检", "xx送检"];
const standardArr = ["标准一", "标准二", "标准三"];
let all = 116
for (let i = 1; i <= all; i++) {
    data.push({
        id: i,
        "name": nameArr[i % 3],
        "age": Math.floor(Math.random() * 70),
        "sex": sexArr[i % 3],
        "type": typeArr[i % 3],
        "standard": standardArr[i % 3],
        "unit": "xx公司",
        "address": Mock.mock('@county(true)'),
        "startDate": Mock.mock('@date("yyyy-MM-dd")'),
        "endDate": Mock.mock('@date("yyyy-MM-dd")'),
        "guid": Mock.mock('@guid'),
        "head": Mock.mock('@cname'),
    })
}
//列表
Mock.mock(`/mock/lims/getList`, "post", function (options) {
    let params = JSON.parse(options.body)
    console.log("请求参数", params);
    const arr = []
    for (let i = (params.pageNo - 1) * params.pageSize; i <= (params.pageNo - 1) * params.pageSize + params.pageSize - 1; i++) {
        if (data[i]) {
            arr.push(data[i])
        }
    }
    return {
        code: 200,
        success: true,
        message: "请求成功",
        data: {
            rows: arr,
            pageNo: params.pageNo,
            pageSize: params.pageSize,
            totalPage: data.length % params.pageSize === 0 ? data.length / params.pageSize : Math.floor(data.length / params.pageSize) + 1,
            totalRows: data.length
        }
    }

});
Mock.mock(`/mock/dataStand`, "post", function () {


    return {
        code: 200,
        success: true,
        message: "请求成功",
        data: [data,data,data]
    }

});
//新增
Mock.mock(`/mock/lims/add`, "post", function () {

    return {
        code: 200,
        success: true,
        message: "请求成功",
    }

});
//删除
Mock.mock(`/mock/lims/delete`, "post", function () {

    return {
        code: 200,
        success: true,
        message: "请求成功",
    }

});
//编辑
Mock.mock(`/mock/lims/edit`, "post", function () {

    return {
        code: 200,
        success: true,
        message: "请求成功",
    }

});
