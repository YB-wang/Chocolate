## Props

| 参数名   | 类型     | 用途                                | 示例 | 默认值 |
| -------- | -------- | :---------------------------------- | ---- | ------ |
| loadData | Function | 加载表格数据的方法  返回一个Promise |      |        |
| rule | Array | 生成表格的规则 |      |        |
| rule.$bind | Object | 传入el-table-column的props（当传入slot时slot的name属性需要写在外层) | ![image-20210918145822159](C:\Users\Wang\AppData\Roaming\Typora\typora-user-images\image-20210918145822159.png) | |
| searchRule | Array | 生成搜索栏的规则 |      |        |
| defaultProps | Object | 表格默认接收{data:[...],total:100}  使用defaultProps可替换键名 |      |        |
| stripe | Boolean | 表格是否白灰相间 |      | false |
| border          | Boolean | 表格是否有边框 |      | false |
| defaultPageSize | Number | 表格默认每页展示多少条数据 |      |        |
| beforeSearch | Function | 查询之前的执行操作 |      |        |
| fullColumnWidth | Boolean | 是否让每一列都自动撑满  width的优先级更高，若使用该属性则不要传入width，个别无法匹配宽度的列需自行设置宽度 |      | false |







###  事件

| 参数名                | 类型     | 用途       | 示例 | 默认值 |
| --------------------- | -------- | ---------- | ---- | ------ |
| handleSelectionChange | Function | 多选框回调 |      |        |



### Slot
| 插槽名   | 类型   | 用途                            | 示例 | 默认值 |
| -------- | ------ | ------------------------------- | ---- | ------ |
| tableNav | String | 位于表格上方和 搜索栏之间的插槽 |      |        |

## slot-cope

#### 获取表格当前行的内容：

```javascript
<span slot="operation" slot-scope="{ record }">
        <el-button @click="edit(record)">编辑</el-button>
      </span>
```

