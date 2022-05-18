import axios from "axios";
import isEqual from "loadsh/isEqual";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
const _hash: Map<InstanceConfig, AxiosInstance> = new Map();
type InstanceConfig = {
  timeout: number;
  baseURL: string;
  headers?: { [key: string]: any };
};
const defaultConfig: InstanceConfig = {
  timeout: 15000,
  baseURL: "/api",
};
//默认实例初始化
const defaultInstance = axios.create(defaultConfig);
_hash.set(defaultConfig, defaultInstance);
//创建实例
const createInstance = (config: InstanceConfig): AxiosInstance => {
  const obj = {
    ...defaultConfig,
    ...config,
  };
  const instance = axios.create(obj);
  _hash.set(obj, instance);
  console.log("新创建的axios实例");
  return instance;
};
//从Map中获取实例 没有则创建
const getInstance = (config: InstanceConfig): AxiosInstance => {
  const obj = {
    ...defaultConfig,
    ...config,
  };
  const intrator = _hash.keys();
  let isDone: boolean = false;
  while (isDone === false) {
    const v: IteratorResult<any> = intrator.next();
    if (v.value) {
      if (isEqual(v.value, obj)) {
        console.log("缓存的axios实例");
        return _hash.get(v.value) as AxiosInstance;
      }
    }
    isDone = !!v.done;
  }
  return createInstance(config);
};
//默认返回默认实例
//如果传入了config 则 从 Map 获取
const useAxios = (
  options: AxiosRequestConfig,
  config: InstanceConfig | undefined = undefined
) => {
  if (config) {
    const instance = getInstance(config);
    return instance.request(options);
  }
  console.log("默认axios实例");
  return defaultInstance.request(options);
};
export default useAxios;
