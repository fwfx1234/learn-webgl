window.onload = function () {
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext("2d");
    drawSector(ctx, 300, 300, 100, [1, 2, 4, 3, 1, 2, 3, 4, 2, 5, 9, 8, 7, 4, 4, 4,]);
};
function drawRadiusRect(ctx, dx, dy, r, width, height) {
    ctx.beginPath();
    r = Math.min(r, height / 2);
    r = Math.min(r, width / 2);
    ctx.moveTo(dx + r, dy);
    ctx.lineTo(dx + width - r, dy);
    ctx.arc(dx + width - r, dy + r, r, -Math.PI / 2, 0);
    ctx.lineTo(dx + width, dy + height - r);
    ctx.arc(dx + width - r, dy + height - r, r, 0, Math.PI / 2);
    ctx.lineTo(dx + r, dy + height);
    ctx.arc(dx + r, dy + height - r, r, Math.PI / 2, Math.PI);
    ctx.lineTo(dx, dy + r);
    ctx.arc(dx + r, dy + r, r, Math.PI, Math.PI * 3 / 2);
    ctx.closePath();
}
function drawSector(ctx, dx, dy, r, dataArray) {
    function color() {
        return "#" + ((Math.random() * 0xffffff) >> 0).toString(16);
    }
    var sum = dataArray.reduce(function (sum, cur) { return sum + cur; }, 0);
    var startAngle = 0;
    for (var i = 0; i < dataArray.length; i++) {
        var data = dataArray[i];
        var angle = data * (Math.PI * 2 / sum);
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "" + color();
        ctx.moveTo(dx, dy);
        ctx.arc(dx, dy, r, startAngle, startAngle + angle);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        startAngle += angle;
    }
}
//# sourceMappingURL=main.js.map