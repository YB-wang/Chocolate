import isEqual from "loadsh/isEqual";
import axios from "axios";
// 请求拦截器
class RequestCenetr {
  constructor() {
    this.defaultConfig = {
      timeout: 15000,
      baseURL: "/api",
    };
    this.requestInterceptorsQueue = [];
    this.reponseInterceptorsQueue = [];
    this._hash = new Map();

    this.defaultInstance = axios.create(this.defaultConfig);
    this._hash.set(this.defaultConfig, this.defaultInstance);
    this.inintInterceptors(this.defaultInstance);
  }
  pipe = (fns) => {
    return (arg) =>
      fns.reduce((prev, fn) => {
        const res = fn(prev);
        return res;
      }, arg);
  };
  //为每个实例设置拦截器
  inintInterceptors = (i) => {
    i.interceptors.request.use(
      (config) => {
        return this.pipe(this.requestInterceptorsQueue)(config);
      },
      (error) => Promise.reject(error)
    );

    i.interceptors.response.use(
      (response) => {
        return this.pipe(this.reponseInterceptorsQueue)(response);
      },
      (error) => Promise.reject(error)
    );
  };
  //创建axios实例
  createInstance = (config) => {
    const obj = {
      ...this.defaultConfig,
      ...config,
    };
    const instance = axios.create(obj);
    this.inintInterceptors(instance);
    this._hash.set(obj, instance);
    console.log("新创建的axios实例");
    return instance;
  };
  //从Map中获取实例 没有则创建
  getInstance = (config) => {
    const obj = {
      ...this.defaultConfig,
      ...config,
    };
    const intrator = this._hash.keys();
    let isDone = false;
    while (isDone === false) {
      const v = intrator.next();
      if (v.value) {
        if (isEqual(v.value, obj)) {
          console.log("缓存的axios实例");
          return this._hash.get(v.value);
        }
      }
      isDone = v.done;
    }
    return this.createInstance(config);
  };
  useRequestInterceptors = (fn) => {
    this.requestInterceptorsQueue.push(fn);
  };
  useReponseInterceptors = (fn) => {
    this.reponseInterceptorsQueue.push(fn);
  };
  //默认返回默认实例
  //如果传入了config 则 从 Map 获取
  useRequest = (options, config = null) => {
    if (config) {
      const instance = this.getInstance(config);
      return instance.request(options);
    }
    console.log("默认axios实例");
    return this.defaultInstance.request(options);
  };
}
const instance = new RequestCenetr();
instance.useReponseInterceptors((config) => {
  console.log("---------拦截器1----------");
  return config;
});
instance.useReponseInterceptors((config) => {
  console.log("---------拦截器2----------");
  return config;
});
console.log("instance :>>", instance);
export default instance;
