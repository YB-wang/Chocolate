import { Select } from "element-ui"
const useSelect = () => {
    const component = {
        props: ["value"],
        model: {
            name: 'value',
            event: 'update:value'
        },
        data() {
            return {
                value2: '',
                options: []
            }
        },
        methods: {
            loadData() {
                this.value2 = this.value
                this.options = [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }]
            }
        },
        watch: {
            value2(val) {
                this.$emit('update:value', val)
            }
        },
        render() {
            const el = (
                <Select v-model={this.value2} {...{ attrs: this.$attrs }} {...{ props: this.$props }} >
                    {this.options.map(item => {
                        return (<el-option value={item.value} key={item.value} label={item.label}></el-option>)
                    })}
                </Select>
            )
            return el
        },
        mounted() {
            // this.loadData()
        }
    }
    return component
}
export default useSelect