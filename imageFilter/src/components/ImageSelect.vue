<template>
  <div>
    <FileupLoad @getFileUrl="getFileUrl"></FileupLoad>
    <canvas ref="canvas" width="0" height="0" class="canvas"></canvas>
    <div class="attice">
      <div
        v-for="(column, index) in attice"
        :key="'cloumn' + index"
        class="column"
      >
        <template v-for="(color, index) in column" :key="color + index">
          <span
            v-if="color"
            class="block"
            :style="{
              background: color,
            }"
          ></span>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import FileupLoad from "./FileupLoad.vue";
import { onMounted, ref } from "@vue/runtime-core";
const canvas = ref(null);
const attice = ref(null);
const getFileUrl = (url) => {
  console.log(url);
  resetCanvas(canvas.value, url);
};
const resetCanvas = (canvas, url, ratio = 10) => {
  const img = document.createElement("img");
  img.onload = async () => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    //像素点数据 每4个位一组 表示一个rgba的像素点  从左到右 从上往下
    const colorData = ctx.getImageData(0, 0, width, height).data;
    /* 组合像素点 将像素点按列分组*/
    const pointList = pointListHandler(colorData, ratio, width);
    console.log("像素点阵(/一维数组的index 为x坐标,二维数组的index 为y坐标/)");
    console.log(pointList);
    attice.value = pointList;
    //创建dom
  };
  img.src = url;
};
//像素数据处理
const pointListHandler = (colorData, ratio, width) => {
  const len = colorData.length;
  let tick = 0;
  let p = [];
  let pnum = 0;
  const pointList = [];
  for (let i = 0; i < len; i++) {
    tick += 1;
    p.push(colorData[i]);
    /*每四个组成一个像素点*/
    if (tick === 4) {
      const column = pnum % width;
      if (!pointList[column]) {
        pointList[column] = [];
      }
      // x轴方向每个 ratio 个取一个像素点
      const shouldXPush =
        ratio <= 2 ? true : column % (ratio - 1) === 0 ? true : false;
      const shouldYPush =
        ratio <= 2
          ? true
          : pointList[column].length % (ratio - 1) === 0
          ? true
          : false;
      if (shouldXPush && shouldYPush) {
        pointList[column].push(`rgba(${p.join(",")})`);
      } else {
        pointList[column].push("");
      }
      tick = 0;
      p = [];
      pnum += 1;
    }
  }
  return pointList;
};
onMounted(() => {
  canvas.value.width = innerWidth;
  canvas.value.height = innerHeight;
});
</script>
<style scoped>
.avatar-uploader,
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.canvas {
  display: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.attice {
  display: flex;
}
.attice .column {
  display: inline-flex;
  flex-direction: column;
}

.attice .column .block {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-sizing: border-box;
  margin: 3px;
}
</style>
