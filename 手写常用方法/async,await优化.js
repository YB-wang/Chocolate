const errorCaptured = (asyncFun) => {
    try {
        let res = await asyncFun()
        return [null, res]
    } catch (e) {
        return [e, null]
    }
}

// let [err,res] = await errorCaptured(asyncFun)