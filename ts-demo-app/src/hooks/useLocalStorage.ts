import { reactive, computed, ComputedRef } from "vue";
const createReactiveLocalStorage = (): object => {
  const _localStorage = reactive({});
  Object.keys(window.localStorage).forEach((k: string) => {
    _localStorage[k] = JSON.parse(window.localStorage[k]);
  });
  return _localStorage;
};
const $localStorage = createReactiveLocalStorage();
const useLocalStorage = (...rest: Array<any>): [ComputedRef<any>, Function] => {
  const key: string = rest[0];
  const val = rest[1];
  const setFn = (v: string) => {
    $localStorage[key] = v;
    localStorage.setItem(key, JSON.stringify(v));
  };
  const comVal = computed(() => {
    return $localStorage[key];
  });
  if (val) setFn(val);
  return [comVal, setFn];
};
export default useLocalStorage;
