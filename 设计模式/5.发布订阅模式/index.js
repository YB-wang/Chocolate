class EventEmiter {
    constructor() {
        this.map = new Map()
    }
    on(key, callback) {
        this.map.set(key, callback)
    }
    emit(key, value) {
        const callback = this.map.get(key)
        if (!callback) return
        callback(value)
    }
}

const emiter = new EventEmiter()
emiter.on('show', () => console.log(666))
emiter.emit('show')