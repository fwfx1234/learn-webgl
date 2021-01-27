window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector('#canvas')
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    // ctx.beginPath()
    // ctx.arc(300, 300, 100, 0, Math.PI * 2)
    // ctx.closePath()
    // ctx.stroke()
    //
    // drawRadiusRect(ctx, 100, 200, 50, 100, 100)
    // ctx.stroke()

    drawSector(ctx, 300, 300, 100, [1, 2, 4, 3, 1,2,3,4,2,5,9,8,7,4,4,4,])
}

function drawRadiusRect(ctx: CanvasRenderingContext2D, dx:number, dy:number, r:number, width:number, height:number) {
    ctx.beginPath()
    r = Math.min(r, height / 2)
    r = Math.min(r, width / 2)
    ctx.moveTo(dx + r, dy)
    ctx.lineTo(dx + width - r, dy)
    ctx.arc(dx + width - r, dy + r, r, -Math.PI / 2, 0)
    ctx.lineTo(dx + width, dy + height - r)
    ctx.arc(dx + width - r, dy + height - r, r, 0, Math.PI / 2)
    ctx.lineTo(dx + r, dy + height)
    ctx.arc(dx + r, dy + height - r, r, Math.PI / 2, Math.PI)
    ctx.lineTo(dx, dy + r)
    ctx.arc(dx + r, dy + r, r, Math.PI, Math.PI * 3 / 2)
    ctx.closePath()
}

function drawSector(ctx: CanvasRenderingContext2D, dx: number, dy: number, r: number, dataArray: Array<number>) {
    function color(): string {
        return "#" + ((Math.random() * 0xffffff) >> 0).toString(16)
    }

    const sum: number = dataArray.reduce((sum: number, cur: number): number => sum + cur, 0) as number
    let startAngle = 0
    for (let i: number = 0; i < dataArray.length; i++) {
        const data: number = dataArray[i]
        const angle: number = data * (Math.PI * 2 / sum)
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = `${color()}`
        ctx.moveTo(dx, dy)
        ctx.arc(dx, dy, r, startAngle, startAngle + angle)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
        startAngle += angle

    }

}
