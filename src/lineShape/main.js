window.onload = function () {
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext('2d');
    drawPolygon(ctx, 8, 300, 200, 100);
    ctx.stroke();
    drawColorBroad(ctx, 0, 0, 100);
    ctx.stroke();
};
function drawTriangle(ctx, x, y, width) {
    ctx.save();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width * Math.sin(Math.PI / 6), y + width * Math.cos(Math.PI / 6));
    ctx.lineTo(x + +width * Math.sin(Math.PI / 6) - width, y + width * Math.cos(Math.PI / 6));
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();
}
function drawPolygon(ctx, n, dx, dy, size) {
    ctx.beginPath();
    var degree = Math.PI * 2 / n;
    for (var i = 0; i < n; i++) {
        var x = Math.cos(degree * i);
        var y = Math.sin(degree * i);
        ctx.lineTo(x * size + dx, y * size + dy);
    }
    ctx.closePath();
}
function drawColorBroad(ctx, dx, dy, height) {
    ctx.beginPath();
    var r = 255;
    var g = 0;
    var b = 0;
    for (var i = 0; i < 125; i++) {
        if (i < 25) {
            g += 10;
        }
        else if (i > 25 && i < 50) {
            r -= 10;
        }
        else if (i > 50 && i < 75) {
            g -= 10;
            b += 10;
        }
        else if (i > 75 && i < 100) {
            r += 10;
        }
        else {
            b -= 10;
        }
        ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        ctx.fillRect(i * 2, 0, 2, height);
    }
    ctx.closePath();
}
//# sourceMappingURL=main.js.map