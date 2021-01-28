import {initShader, createRenderer, createBuffer} from '../utils/shader'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    const gl: WebGLRenderingContext = canvas.getContext("webgl")

    const controller = {
        r: 0.0,
        g: 0.5,
        b: 0.0,
        size: 10.0,
    }

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const V_SHADER_SOURCE = `
        attribute vec4 a_Position;
        attribute float a_Size;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = a_Size;
        }
    `
    const F_SHADER_SOURCE = `
        precision mediump float;
        uniform vec4 u_Color;
        void main() {
            gl_FragColor = u_Color;
        }
    `
    const program: WebGLProgram = initShader(gl, V_SHADER_SOURCE, F_SHADER_SOURCE)
    const a_Position = gl.getAttribLocation(program, 'a_Position')
    if (a_Position < 0) {
        console.error('error', a_Position)
    }
    const a_Size = gl.getAttribLocation(program, 'a_Size')
    const u_Color = gl.getUniformLocation(program, 'u_Color')
    const points: Array<number> = []
    for (let i = 0; i <= 1; i += 0.001) {
        points.push(...[i, 0.0, 0.0])
        points.push(...[0.0, i, 0.0])
        points.push(...[0.0, 0.0, i])
    }
    const n = createBuffer(gl, new Float32Array(points), 3)
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)

    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.vertexAttrib1f(a_Size, controller.size)
        gl.uniform4f(u_Color, controller.r, controller.g, controller.b, 1.0)
        gl.drawArrays(gl.POINTS, 0, n)
    }

    let {renderer, gui} = createRenderer({
        cb: draw
    })
    renderer()

    gui.add(controller, 'size', 0.0, 100.0)
    gui.add(controller, 'r', 0.0, 1.0)
    gui.add(controller, 'g', 0.0, 1.0)
    gui.add(controller, 'b', 0.0, 1.0)

}
