class SourceTree {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.framesCount = 0;
        this.WIDTH = canvas.width;
        this.HEIGHT = canvas.height;
        this.pendingTasks = [];
        this.init();
        this.startFrame()
    }
    init() {
        this.ctx.strokeStyle = 'black'
        this.step({
            start: { x: this.WIDTH / 2, y: this.HEIGHT },
            length: 10,
            theta: -Math.PI / 2,
        })
    }
    /*
        传入两个点位  画一条线
        interface Point {
                            x: number
                            y: number
                        }
    
        interface Branch {
                            start: Point
                            length: number
                            theta: number
                        }
    */
    lineTo(p1, p2) {
        this.ctx.beginPath()
        this.ctx.moveTo(p1.x, p1.y)
        this.ctx.lineTo(p2.x, p2.y)
        this.ctx.stroke();
    }
    /* 传入一个 Branch 划线*/
    drawBranch(branch) {
        this.lineTo(branch.start, this.getEndPoint(branch))
    }
    /* 传入一个Branch 得到他的终点 */
    getEndPoint(branch) {
        return {
            x: branch.start.x + branch.length * Math.cos(branch.theta),
            y: branch.start.y + branch.length * Math.sin(branch.theta),
        }
    }
    /* 传入一个branch depth是最小深度 一定几率 长出分支*/
    step(branch, depth = 0, min = 4, max = 50) {
        const end = this.getEndPoint(branch);
        this.drawBranch(branch);
        if ((depth < min || Math.random() < 0.5) && depth < max) {
            this.pendingTasks.push(() => this.step({
                start: end,
                length: branch.length + (Math.random() * 10 - 5),
                theta: branch.theta - 0.3 * Math.random(),
            }, depth + 1))
        }
        if ((depth < min || Math.random() < 0.5) && depth < max) {
            this.pendingTasks.push(() => this.step({
                start: end,
                length: branch.length + (Math.random() * 10 - 5),
                theta: branch.theta + 0.3 * Math.random(),
            }, depth + 1))
        }
    }

    frame() {
        const tasks = [...this.pendingTasks]
        this.pendingTasks.length = 0
        tasks.forEach(fn => fn())
    }
    /* 开始画树*/
    startFrame() {
        requestAnimationFrame(() => {
            this.framesCount += 1
            if (this.framesCount % 3 === 0)
                this.frame()
            this.startFrame()
        })
    }
}

export default SourceTree