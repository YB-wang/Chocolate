import Vue from 'vue'
const _cache = new Map()
export function useVSelect(loadData) {
    return {
        _cache,
        name: 'VSelect',
        data() {
            return {

            }
        },
        methods: {
            fetchData(params = {}) {
                loadData(params).then(res)=> {
                    console.log(res)
                }
            }
        },
    }
}