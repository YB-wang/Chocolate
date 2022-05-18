<template>
  <div style="display: flex">
    <SelectImg @getFileUrl="getFileUrl"></SelectImg>
    <canvas ref="canvas" width="0" height="0" class="canvas"></canvas>
    <div class="attice">
      <div
        v-for="(column, index) in attice"
        :key="'cloumn' + index"
        class="column"
      >
        <span
          v-for="(color, index) in column"
          :key="color + index"
          :ref="setItemRef"
          class="block"
          :style="{
            background: color,
          }"
        ></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SelectImg from "./SelectImg.vue";
import shuffle from "loadsh/shuffle";
import { onMounted, ref, onUpdated } from "vue";
interface HTMLElementPlus extends HTMLElement {
  startX: number;
  startY: number;
  curX: number;
  curY: number;
}
const canvas = ref<HTMLCanvasElement | null>(null);
const attice = ref<Array<Array<string>>>([]);
const pointDomList = ref<Array<HTMLElement>>([]);
const setItemRef = (el: HTMLElementPlus): void => {
  pointDomList.value.push(el);
};
const getFileUrl = (url: string) => {
  resetCanvas(canvas.value as HTMLCanvasElement, url);
};

const resetCanvas = (canvas: HTMLCanvasElement, url: string): void => {
  pointDomList.value = [];
  const img: HTMLImageElement = document.createElement("img");
  img.onload = async () => {
    const ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width: number = img.naturalWidth;
    const height: number = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const colorData: Uint8ClampedArray = ctx.getImageData(
      0,
      0,
      width,
      height
    ).data;
    const pointList = pixelListHandler(colorData, 10, width);
    console.log("像素点阵(/外层数组的index 为x坐标,内层数组的index 为y坐标/)");
    console.log(pointList);
    attice.value = pointList;
    //创建dom
  };
  img.src = url;
};
const initAnimation = () => {
  if (!pointDomList.value.length) return;
  const newList = shuffle(pointDomList.value);
  const len: number = newList.length;
  for (let i = 0; i < len; i++) {
    const shuffleDom = newList[i] as HTMLElementPlus;
    const originDom = pointDomList.value[i] as HTMLElementPlus;
    const startRect = shuffleDom.getBoundingClientRect();
    const endRect = pointDomList.value[i].getBoundingClientRect();
    originDom.startX = startRect.left;
    originDom.startY = startRect.top;
    originDom.curX = endRect.left;
    originDom.curY = endRect.top;
    const dom = originDom as HTMLElementPlus;
    requestAnimationFrame(() => {
      dom.animate(
        [
          {
            transform: `translate(${dom.startX - dom.curX}px, ${
              dom.startY - dom.curY
            }px)`,
          },
          { transform: `translate(0px, 0px)` },
        ],
        { duration: 500 }
      );
    });
  }
};
/**
 * @param pixelList  ctx.getImageData
 * @param gap 采样间隔
 * @param width 图片宽度
 */

const pixelListHandler = (
  pixelList: Uint8ClampedArray,
  gap: number,
  width: number
): Array<Array<string>> => {
  const len = pixelList.length;
  gap += 1;
  let tick = 0;
  let p: Array<number> = [];
  let pnum = 0;
  const pointList: Array<Array<string>> = [];
  for (let i = 0; i < len; i++) {
    tick += 1;
    p.push(pixelList[i]);
    if (tick === 4) {
      const column: number = (pnum + 1) % width;
      if (!pointList[column]) {
        pointList[column] = [];
      }
      const shouldXPush: boolean =
        gap < 2 ? true : column % gap === 0 ? true : false;
      const shouldYPush: boolean =
        gap < 2 ? true : pointList[column].length % gap === 0 ? true : false;
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
  return pointList
    .map((arr) => arr.filter((item) => item))
    .filter((arr) => arr.some((item) => item));
};

onMounted(() => {
  canvas.value!.width = innerWidth;
  canvas.value!.height = innerHeight;
});
onUpdated(() => {
  initAnimation();
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
  transition: var(--el-transition-dugapn-fast);
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
  transform: translateZ(0);
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
  margin: 1px;
}
</style>
