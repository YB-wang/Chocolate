<template>
  <div class="GeneralModel">
    <template v-if="type === 'imgUrl'">
      <a-popover ref="popover" placement="right">
        <template slot="content">
          <img v-if="imgUrl" :src="imgUrl" style="width: 300px; height: 300px" />
          <div v-else class="none-picture-big">
            <a-icon type="picture" :style="{ fontSize: '60px' }"/>
            <p>暂无图片</p>
          </div>
        </template>
        <img v-if="imgUrl" :src="imgUrl" style="margin-right: 10px;" :style="modelData.style || defaultPictureSize" />
        <div v-else class="none-picture" :style="modelData.style || defaultPictureSize" >
          <a-icon type="picture" :style="{ fontSize: '30px' }"/>
          <p>暂无图片</p>
        </div>
      </a-popover>
    </template>

    <template v-else-if="type === 'dialog'">
      <a-modal :visible="visible" :title="title || '提示'" :width="modelData.width || '800px'" :maskClosable="false" @cancel="visible = false" v-on="modelData">
        <template slot="title">
          <slot name="title"></slot>
        </template>
        <slot> </slot>
        <template slot="footer">
          <slot name="footer"></slot>
        </template>
      </a-modal>
    </template>

    <template v-else-if="type === 'paging'">
      <a-pagination
        :pageSize.sync="modelData.pageSize"
        :total="modelData.total"
        :show-total="(total) => `共 ${total} 数据`"
        v-model="modelData.pageNum"
        :pageSizeOptions="['10', '15', '20']"
        :size="modelData.size || 'small'"
        show-size-changer
        :default-current="1"
        v-bind="modelData.props"
        v-on="modelData.listeners"
      >
      </a-pagination>
    </template>

    <template v-else-if="type === 'desc'">
      <a-descriptions :bordered="modelData.bordered" :size="size" :column="modelData.column || 3">
        <a-descriptions-item v-for="(item, index) in modelData.detailList" :key="index" :label="item.label" :span="item.span">
          {{ item.value }}
        </a-descriptions-item>
      </a-descriptions>
    </template>
  </div>
</template>

<script>
export default {
  name: 'GeneralModel',
  props: {
    // 传入数据的集合
    modelData: {
      type: Object,
      default: () => ({}),
    },
    // 使用组件的type,目前有[图片预览(imgUrl),弹框(dialog),页脚(pagination),描述(desc,目前功能还有待完善)]
    type: String,
    // 图片的url地址
    imgUrl: String,
    // 弹框的title
    title: String,
    // 
    size: {
      type: String,
      default: 'small',
    },
    // 弹框的显示
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      },
    },
  },
  data() {
    return {
      defaultPictureSize: {
        width: '80px', 
        height: '80px', 
      }
    };
  },
  methods: {},
};
</script>

<style scoped>
.none-picture {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.none-picture i {
  margin-bottom: 5px;
}
p {
  margin: 0;
  user-select: none;
}
.none-picture-big {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px; 
  height: 300px; 
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 30px;
}
.none-picture-big i {
  margin-bottom: 20px;
}
</style>