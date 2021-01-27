window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    const gl: WebGLRenderingContext = canvas.getContext("webgl")
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
}
