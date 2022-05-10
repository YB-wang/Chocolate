import { reactive, computed } from "vue";
const createReactiveLocalStorage = () => {
  const _localStorage = reactive({});
  Object.keys(window.localStorage).forEach((k) => {
    _localStorage[k] = JSON.parse(window.localStorage[k]);
  });
  return _localStorage;
};
const $localStorage = createReactiveLocalStorage();
const useLocalStorage = (...rest) => {
  const key = rest[0];
  const val = rest[1];
  const setFn = (v) => {
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
