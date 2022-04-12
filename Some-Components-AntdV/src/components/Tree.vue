<template>
    <a-tree
        max-height="350"
        v-model="checkedKeys"
        checkable
        multiple
        :defaultExpandAll="true"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @check="onCheck"
    />
</template>
<script>

export default {
    props: {
        permissions: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            autoExpandParent: true,
            checkedKeys: [],
            halfCheckedKeys: [],
            selectedKeys: [],
            treeData: [
                {
                    title: '0-0',
                    key: '0-0',
                    children: [
                        {
                            title: '0-0-0',
                            key: '0-0-0',
                            children: [
                                { title: '0-0-0-0', key: '0-0-0-0' },
                                { title: '0-0-0-1', key: '0-0-0-1' },
                                { title: '0-0-0-2', key: '0-0-0-2' },
                            ],
                        },
                        {
                            title: '0-0-1',
                            key: '0-0-1',
                            children: [
                                { title: '0-0-1-0', key: '0-0-1-0' },
                                { title: '0-0-1-1', key: '0-0-1-1' },
                                { title: '0-0-1-2', key: '0-0-1-2' },
                            ],
                        },
                        {
                            title: '0-0-2',
                            key: '0-0-2',
                        },
                    ],
                },
                {
                    title: '0-1',
                    key: '0-1',
                    children: [
                        { title: '0-1-0-0', key: '0-1-0-0' },
                        { title: '0-1-0-1', key: '0-1-0-1' },
                        { title: '0-1-0-2', key: '0-1-0-2' },
                    ],
                },
                {
                    title: '0-2',
                    key: '0-2',
                },
            ],
            temp: []
        };
    },
    methods: {
        onCheck(checkedKeys, event) {
            console.log(event);
            this.halfCheckedKeys = event.halfCheckedKeys;
            if (this.temp.length) {
                this.temp = [];
            }
        },
        findAllChildren(data) {
            data.forEach((item) => {
                //去除父节点
                if (item.children && item.children.length !== 0) {
                    for (let i = 0; i < this.checkedKeys.length; i++) {
                        if (item.key === this.checkedKeys[i]) {
                            this.temp.push(this.checkedKeys[i])
                            this.checkedKeys.splice(i, 1);
                        }
                    }
                    this.findAllChildren(item.children)
                }
            })
        },
        submit() {
            console.log("user permissions:", this.getPermissions());
        },
        getAllKeys() {
            return [...new Set([...this.checkedKeys, ...this.halfCheckedKeys, ...this.temp])]
        },
        getPermissions() {
            return [...new Set([...this.checkedKeys, ...this.halfCheckedKeys, ...this.temp])]
        }
    },
    beforeCreate() {
        console.log("子组件：beforeCreate");
    },
    created() {
        console.log("子组件：created");
    },
    beforeMount() {
        console.log("子组件：beforeMount");
    },
    mounted() {
         console.log("子组件：mounted");
        function getAllKeys(treeData, userData) {
            let checkedKeys = [];
            let halfCheckedKeys = [];
            function testNode(node) {
                function isfullChecked(node) {
                    if (node?.children?.length) {
                        return node.children.every(res => userData.includes(res.key) && (res?.children?.length ? isfullChecked(res.children) : true));
                    }
                    return true
                }
                isfullChecked(node) ? checkedKeys.push(node.key) : halfCheckedKeys.push(node.key);
            }
            function divideNode(tree) {
                tree.forEach(node => {
                    if (userData.includes(node.key)) {
                        testNode(node);
                    }
                    if (node?.children?.length) {
                        divideNode(node.children)
                    }
                })
            }
            divideNode(treeData);
            return {
                checkedKeys,
                halfCheckedKeys
            }
        }
        // console.log("当前树:", JSON.stringify(this.treeData));
        // console.log("当前用户数据", this.permissions);
        // console.log("筛选结果:", getAllKeys(this.treeData, this.permissions));

        let { checkedKeys,
            halfCheckedKeys } = getAllKeys(this.treeData, this.permissions);
        this.checkedKeys = checkedKeys;
        this.halfCheckedKeys = halfCheckedKeys;
    }
};
</script>