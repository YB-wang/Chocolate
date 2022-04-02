const colorList = [
    '#C45C66',
    '#C3CE5F',
    '#00ACA5',
    '#F19923',
    '#B493F3',
]
export function getRadian(angle) {
    return parseFloat(Math.PI * angle / 180).toFixed(10)
}

export function getangle(radian) {
    return parseFloat(radian * 180 / Math.PI).toFixed(10)
}
class Base {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas
        this.colorList = colorList;
        this.color = colorList[Math.floor(Math.random() * this.colorList.length)];

    }
}

export class Circle extends Base {
    constructor(ctx, canvas) {
        super(ctx, canvas)
        this.x = Math.floor(Math.random() * (canvas.width - 300) + 150);
        this.y = Math.floor(Math.random() * (canvas.height - 300) + 150);
        this.offset = 2;
        this.size = Math.floor(Math.random() * 80 + 20);
        this.angle = 360;
        this.draw()
    }
    draw() {
        this.ctx.globalCompositeOperation = 'multiply'
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        this.ctx.arc(this.x, this.y, this.size, getRadian(this.angle), 0)
        this.ctx.lineTo(this.x, this.y)
        this.ctx.closePath()
        this.ctx.fill();
        this.angle += this.offset;
        this.offset += 0.02
    }
}