window.onload = function () {
    var canvas = document.querySelector("#canvas");
    canvas.width *= window.devicePixelRatio;
    canvas.height *= window.devicePixelRatio;
    var ctx = canvas.getContext('2d');
    var canvasSelection = new CanvasSelection(ctx);
    ctx.lineWidth = 4;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
};
var CanvasSelection = (function () {
    function CanvasSelection(ctx) {
        this.isDraw = false;
        this.ctx = ctx;
        this.ctx.canvas.addEventListener("mousedown", this.start.bind(this));
        this.ctx.canvas.addEventListener("mousemove", this.move.bind(this));
        this.ctx.canvas.addEventListener("mouseup", this.end.bind(this));
    }
    CanvasSelection.prototype.start = function (ev) {
        this.startX = ev.clientX * window.devicePixelRatio;
        this.startY = ev.clientY * window.devicePixelRatio;
        this.isDraw = true;
        if (this.imageData) {
            this.ctx.putImageData(this.imageData, 0, 0);
        }
        this.imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };
    CanvasSelection.prototype.move = function (ev) {
        this.endX = ev.clientX * window.devicePixelRatio;
        this.endY = ev.clientY * window.devicePixelRatio;
        if (!this.isDraw || Math.abs(this.endX - this.startX) < 5 || Math.abs(this.endY - this.startY) < 5) {
            return;
        }
        this.draw();
    };
    CanvasSelection.prototype.end = function () {
        this.isDraw = false;
    };
    CanvasSelection.prototype.draw = function () {
        this.ctx.save();
        this.ctx.beginPath();
        if (this.imageData) {
            this.ctx.putImageData(this.imageData, 0, 0);
        }
        this.ctx.setLineDash([8, 8, 8]);
        this.ctx.rect(this.startX, this.startY, this.endX - this.startX - 5, this.endY - this.startY - 5);
        this.ctx.stroke();
        this.ctx.restore();
    };
    return CanvasSelection;
}());
//# sourceMappingURL=main.js.map