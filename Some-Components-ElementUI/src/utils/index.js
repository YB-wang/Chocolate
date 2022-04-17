//将二维数组根据列和 排序 默认降序排序
export function sortByColumns(arr, isHigher = false) {
  const instance = arr
  if (!Array.isArray(instance)) {
    throw new Error('参数必须为二维数组')
  }
  instance.forEach(item => {
    if (!Array.isArray(item)) {
      throw new Error('参数必须为二维数组')
    }
  })
  try {
    let width = instance[0].length
    let height = instance.length
    let totalArr = []
    for (let i = 0; i < width; i++) {
      let sum = 0;
      for (let j = 0; j < height; j++) {
        sum += instance[j][i]
      }
      totalArr.push(sum)

    }
    totalArr = totalArr.map((item, index) => {
      return {
        num: item,
        index
      }
    })
    if (isHigher) {
      totalArr = totalArr.sort((a, b) => a.num - b.num)
    } else {
      totalArr = totalArr.sort((a, b) => b.num - a.num)
    }
    const res = instance.map(arr => {
      const newArr = []
      totalArr.forEach(item => {
        newArr.push(arr[item.index])
      })
      return newArr
    })
    return res
  } catch (err) {
    throw new Error(err)
  }

}






export function base64ToBlob(base64) {
  const parts = base64.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}