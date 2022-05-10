import instance from "../../../plugin/http.js";
//正常请求
export function login(obj = {}) {
  const options = {
    url: "/user/login",
    method: "post",
    data: obj,
  };
  return instance.useRequest(options);
}

//如果你有某个请求需要单独配置请求参数
// 请在第二个参数置传入 默认会覆盖defaultConfig的属性
export function login2(obj = {}) {
  const options = {
    url: "/user/login2",
    method: "post",
    data: obj,
  };
  return instance.useRequest(options, { baseURL: "/login2" });
}

export function login3(obj = {}) {
  const options = {
    url: "/user/login3",
    method: "post",
    data: obj,
  };
  return instance.useRequest(options, { baseURL: "/login3" });
}
