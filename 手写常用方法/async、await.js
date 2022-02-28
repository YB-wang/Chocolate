async function _show() {
    for (let i = 1; i <= 11; i++) {
        if(i===11) i=1
        const res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(i)
            }, 500);
        })
        console.log(res);
    }
}
// _show()