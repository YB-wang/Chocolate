let wtimer
wtimer=setInterval(() => {
	console.log(wtimer);
}, 500);
class FallLayOut {
	constructor(container, { widthGap = 20, heightGap = 20 }) {
		// 传入元素的class或id名称
		this.containerName = container;
		this.container = document.querySelector(container);
		this.items = this.container.querySelectorAll(`${this.containerName} > div`);
		// 元素间宽度间隔
		this.widthGap = widthGap;
		// 元素间高度间隔
		this.heightGap = heightGap;
		// 存放元素模型的二维数组
		this.squareRect = [];
		// 每个item的宽度
		this.baseWidth = null;
		// 当前排列的列数
		this.column = null;
		this.init()
	}
	// 初始化
	init() {
		let that = this;

		this.baseWidth = this.items[0].clientWidth + this.widthGap;
		// 获取当前容器可以放置列数
		this.column = Math.floor(this.container.clientWidth / this.baseWidth);

		this.setGlobalStyle();

		window.addEventListener("load", this.reset());
		window.addEventListener(
			"resize",
			this.debounce(() => {
				// 如果行数与页面改变前一样，则不产生变化，
				const newColumn = Math.floor(this.container.clientWidth / this.baseWidth);
				if (newColumn !== this.column) {
					this.column = newColumn;
					requestAnimationFrame(this.reset.bind(that));
				}
			}, 50)
		);
	}
	// 设置起始样式
	setGlobalStyle() {
		let style = document.createElement("style");
		style.className = "fall";
		style.innerHTML = `
${this.containerName} {
  position: relative;
}
${this.containerName}>div {
  position: absolute;
  transition: top 0.3s, left 0.3s;
  willChange: top, left;
}
    `;
		document.body.appendChild(style);
	}
	// 绘制瀑布流
	reset() {
		this.items = this.container.querySelectorAll(`${this.containerName} > div`);
		let { squareRect, widthGap, heightGap, container, items, column } = this;
		squareRect = [];
		// 首次遍历获取元素的数组模型
		items.forEach((node, index) => {
			//y轴坐标
			const y = Math.floor(index / column);
			//x轴坐标
			const x = index % column;
			if (y > 0) {
				// 获取到高度最小行的下表，将新元素存入其中
				let minNum = this.getMinColumnNum(squareRect);
				squareRect[minNum].push(node);
			} else {
				// 第一层元素无须操作，直接存入
				squareRect.push([node]);
			}
		});

		let maxHeight = this.getColumnHeight(squareRect[0]);
		this.container.style.height = maxHeight + squareRect.length * heightGap + "px";
		// 二次遍历通过元素数组模型排列元素在页面中的位置
		squareRect.forEach((nodeList, col) => {
			let compareHeight = this.getColumnHeight(nodeList);
			if (maxHeight < compareHeight) {
				maxHeight = compareHeight;
				this.container.style.height = maxHeight + nodeList.length * heightGap + "px";
			}
			nodeList.forEach((item, row) => {
				item.style.left = `${col * this.baseWidth}px`;
				if (row === 0) {
					item.style.top = `0px`;
				} else {
					item.style.top = `${parseInt(nodeList[row - 1].style.top) + nodeList[row - 1].clientHeight + heightGap}px`;
				}
			});
		});
	}
	// 获取当前数组中高度最底一行的下标
	getMinColumnNum(arr) {
		let min = this.getColumnHeight(arr[0]);
		let index = 0;
		for (let i = 1; i < arr.length; i++) {
			const top = this.getColumnHeight(arr[i]);
			if (min > top) {
				min = top;
				index = i;
			}
		}
		return index;
	}
	// 获取数组中所有元素的高度总和
	getColumnHeight(arr) {
		let height = 0;
		if (arr.length > 0) {
			arr.forEach(item => {
				height += item.clientHeight;
			});
		}
		return height;
	}
	setStyle(el, styleObj) {
		for (const key in styleObj) {
			if (Object.hasOwnProperty.call(styleObj, key)) {
				const val = styleObj[key];
				el.style[key] = val;
			}
		}
	}
	debounce(func, delay) {
		let timer = null;
		return function () {
			let context = this;
			let args = arguments;
			if (timer) {
				clearTimeout(timer);
			}
			
			timer = setTimeout(function () {
				func.apply(context, args);
			}, delay);
		};
	}
}

const box =new FallLayOut("#app",{ widthGap:20, heightGap:20 });
box.init()