const debounce = {
    inserted: function (el, binding) {
        let timer
        el.addEventListener('click', () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                binding.value()
            }, 1000)
        })
    },
}
//v-debounce="点击事件"
export default debounce
