<template>
  <div class="FormComponent">
    <template v-if="formItem.component === 'a-select'">
      <a-select
        v-model="data[formItem.prop]"
        :placeholder="'请选择' + formItem.label"
        clearable
        v-bind="formItem.props || {}"
        v-on="formItem.listeners || {}"
        style="width: 100%"
      >
        <a-select-option
          v-for="item in formItem.options"
          :key="item.value"
          :value="item.value"
        >{{ item.label }}</a-select-option>
      </a-select>
    </template>

    <template v-if="formItem.component === 'a-tree-select'">
      <a-tree-select
        v-model="data[formItem.prop]"
        :placeholder="'请选择' + formItem.label"
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="formItem.options"
      ></a-tree-select>
    </template>

    <template v-if="formItem.component === 'a-checkbox'">
      <div style="text-align: left">
        <a-checkbox-group v-model="data[formItem.prop]">
          <a-checkbox
            v-for="item in formItem.options"
            :key="item.value"
            :value="item.value"
          >{{ item.label }}</a-checkbox>
        </a-checkbox-group>
      </div>
    </template>

    <template v-if="formItem.component === 'a-radio'">
      <div style="text-align: left">
        <a-radio-group v-model="data[formItem.prop]">
          <a-radio
            v-for="item in formItem.options"
            :key="item.value"
            :value="item.value"
          >{{ item.label }}</a-radio>
        </a-radio-group>
      </div>
    </template>

    <template v-if="formItem.component === 'a-upload'">
      <a-upload
        list-type="picture-card"
        class="avatar-uploader"
        :action="formItem.url || 'http://127.0.01:3030/uploadFile'"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        :before-upload="beforeUpload"
      >
        <div v-if="fileList.length <= (formItem.limit || 10)" class="item">
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">上传</div>
        </div>
      </a-upload>
    </template>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  name: "FormComponent",
  props: {
    /**
     * 传入的表单存储的对象
    */
    data: {
      type: Object,
      default: () => ({}),
    },
    /** 
     * 传入的表单组件信息
     * {
     *  component:组件名,
     *  prop:对象值,
     *  label:label名称,
     *  options: 下拉选or复选or单选
     *  sm,md占用位置占比
     *  rules:正则,
     *  required: 是否需要验证,
     *  props:给组件绑定的值
     *  listeners:给组件绑定的事件
     * }
    */
    formItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      imageUrl: [],
      fileList: [],
    };
  },
  created() {
    if (!Array.isArray(this.formItem.options)) {
      this.formItem.options.then(res => {
        this.formItem.options = res
      })
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList, file }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.data[this.formItem.prop] = this.fileList.map(item => item.response.file.fileId)
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif";
      if (!isJpgOrPng) {
        this.$message.error("只能上传图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
};
</script>

<style scoped lang="less">
::v-deep .ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>