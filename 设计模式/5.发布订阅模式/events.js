// event.js
class EventEmiter {
    constructor() {
        this._events = {}
    }
    $on(eventName, callback) {
        if (!this._events[eventName]) this._events[eventName] = []
        this._events[eventName].push(callback)
    }

    $emit(eventName, ...args) {
        if (!this._events[eventName]) return
        this._events[eventName].forEach(callback => callback(...args))
    }

    $off(eventName, callback) {
        if (!this._events[eventName]) return
        this._events[eventName] = this._events[eventName].filter(cb => cb !== callback && cb.once !== callback)
    }
    $once(eventName, callback) {
        if (!this._events[eventName]) this._events[eventName] = []
        const once = (...args) => {
            callback(...args)
            this.$off(eventName, once)
        }
        callback.once = once
        this.$on(eventName, once)
    }
}
export default EventEmiter