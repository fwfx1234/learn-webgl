window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    canvas.width *= window.devicePixelRatio
    canvas.height *= window.devicePixelRatio
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
    // ctx.scale(1/window.devicePixelRatio, 1/window.devicePixelRatio)
    const canvasSelection = new CanvasSelection(ctx)
    ctx.lineWidth = 4
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.stroke()
}


class CanvasSelection {
    private startX: number
    private startY: number
    private endX: number
    private endY: number
    private ctx: CanvasRenderingContext2D
    private isDraw: boolean = false
    private imageData: ImageData
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.ctx.canvas.addEventListener("mousedown", this.start.bind(this))
        this.ctx.canvas.addEventListener("mousemove", this.move.bind(this))
        this.ctx.canvas.addEventListener("mouseup", this.end.bind(this))
    }
    start(ev: MouseEvent) {
        this.startX = ev.clientX * window.devicePixelRatio
        this.startY = ev.clientY * window.devicePixelRatio
        this.isDraw = true
        if (this.imageData) {
            this.ctx.putImageData(this.imageData, 0, 0)
        }
        this.imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    move(ev: MouseEvent) {
        this.endX = ev.clientX * window.devicePixelRatio
        this.endY = ev.clientY * window.devicePixelRatio
        if (!this.isDraw || Math.abs(this.endX - this.startX) < 5 || Math.abs(this.endY - this.startY) < 5) {
            return;
        }
        this.draw()
    }
    end() {
        this.isDraw = false
    }
    draw() {
        this.ctx.save()
        this.ctx.beginPath()
        if (this.imageData) {
            this.ctx.putImageData(this.imageData, 0, 0)
        }
        this.ctx.setLineDash([8, 8, 8])
        this.ctx.rect(this.startX, this.startY, this.endX - this.startX - 5, this.endY - this.startY - 5);
        this.ctx.stroke()
        this.ctx.restore()
    }
}
