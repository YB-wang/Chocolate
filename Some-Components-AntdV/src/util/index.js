export const Debounce = (fn, t) => {
    let delay = t || 200;
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn();
            clearTimeout(timer);
            timer = null;
        }, delay);
    };
};