<template>
    <el-select
        :size="$attrs.size"
        v-model="selectText"
        @change="selectChange"
        popper-class="ybselect"
        :placeholder="$attrs.placeholder"
        ref="selectTree"
    >
        <div :style="dropStyle">
            <el-input v-model="searchText" :size="$attrs.size" v-if="filterable"></el-input>
            
            <el-option :label="'全部'" :value="'全部'" v-if="data.length"></el-option>
            <el-tree
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :default-expand-all="defaultexpandall"
                :size="$attrs.size"
                :filter-node-method="filterNode"
                ref="tree"
            ></el-tree>
        </div>
    </el-select>
</template>
<script>
export default {
    name: "yb-treeSelect",
    inheritAttrs: false,
    model: {
        event: "change"
    },
    props: {
        value: {
            default: () => {
                return ''
            }
        },
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        defaultProps: {
            type: Object,
            default: () => {
                return {
                    children: 'children',
                    label: 'label',
                    value: 'value'
                }
            }
        },
        maxHeight: {
            type: String,
            default: () => {
                return "200px"
            }
        },
        filterable: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        defaultexpandall: {
            type: Boolean,
            default: () => {
                return true
            }
        }
    },
    data() {
        return {
            searchText: "",
            selectText: "",
            dropStyle: {
                padding: "10px",
                maxHeight: this.maxHeight
            }
        }
    },
    methods: {
        selectChange(val) {
            this.selectText = val;
            if (val === "全部") {
                this.$emit("change", "");
            }
        },
        handleNodeClick(val) {
            this.checked = val;
            this.selectText = val.label;
            this.$emit("change", val[this.defaultProps.value]);
            this.$refs.selectTree.blur();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },
    watch: {
        searchText(val) {
            console.log(val);
            this.$refs.tree.filter(val);
        },
        value(val) {
            if (val === "") {
                this.selectText = "全部"
            }
        }
    }
}
</script>
