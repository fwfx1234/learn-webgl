window.onload = function () {
    initPaintBroad()
}
function initPaintBroad() {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

}
