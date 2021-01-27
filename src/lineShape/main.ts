window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

    // drawTriangle(ctx, 150, 150, 100)
    // ctx.strokeStyle = "#ff0000"
    // ctx.strokeRect(0, 0, 250, 150)

    drawPolygon(ctx, 8, 300, 200, 100)
    ctx.stroke();

    drawColorBroad(ctx, 0, 0, 100)
    ctx.stroke();

}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number) {
    ctx.save();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width * Math.sin(Math.PI / 6), y + width * Math.cos(Math.PI / 6));
    ctx.lineTo(x + +width * Math.sin(Math.PI / 6) - width, y + width * Math.cos(Math.PI / 6));
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.restore();
}

function drawPolygon(ctx: CanvasRenderingContext2D, n: number, dx: number, dy: number, size: number) {
    // 中点在正n边形的顶点所在的圆的圆心， 第一个点x轴
    ctx.beginPath();
    const degree = Math.PI * 2 / n;
    for (let i: number = 0; i < n; i++) {
        let x = Math.cos(degree * i);
        let y = Math.sin(degree * i);
        ctx.lineTo(x * size + dx, y * size + dy)
    }
    ctx.closePath();
}

function drawColorBroad(ctx: CanvasRenderingContext2D, dx: number, dy: number, height: number) {
    ctx.beginPath()
    let r: number = 255;
    let g: number = 0;
    let b: number = 0;

    for(let i: number = 0; i < 125; i++) {
        if (i < 25) {
            g+=10
        } else if(i > 25 && i < 50) {
            r-=10
        }else if(i > 50 && i < 75) {
            g-=10
            b+=10
        }else if(i > 75 && i < 100) {
            r+=10
        } else {
            b-=10
        }
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(i * 2, 0,  2, height)
    }
    ctx.closePath()
}
