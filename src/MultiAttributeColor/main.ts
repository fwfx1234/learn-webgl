import fShader from './fShaderSource.frag'
import vShader from './vShaderSource.vert'
import {initShader, createRenderer, createBuffer} from '../utils/shader'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("canvas")
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    const gl: WebGLRenderingContext = canvas.getContext('webgl')

    const program: WebGLProgram = initShader(gl, vShader, fShader)

    const a_Position: number = gl.getAttribLocation(program, 'a_Position')
    const a_Color = gl.getAttribLocation(program, 'a_Color')

    const c = {
        r: 1.0,
        g: 1.0,
        b: 1.0
    }

    function render() {
        gl.clearColor(1.0, 1.0, 1.0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        let arr: Array<number> = [
            0.0, 0.5, c.r, 0.0, 0.0,
            -0.5, 0.0, 0.0, c.g, 0.0,
            0.5, 0.0, 0.0, 0.0, c.b,
        ]

        const n = createBuffer(gl, new Float32Array(arr), 5)
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 4 * 5, 0)
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 4 * 5, 2 * 4)

        gl.enableVertexAttribArray(a_Position)
        gl.enableVertexAttribArray(a_Color)

        gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
    }


    const {renderer, gui} = createRenderer({
        cb: render
    })
    renderer()
    gui.add(c, 'r', 0.0, 1.0)
    gui.add(c, 'g', 0.0, 1.0)
    gui.add(c, 'b', 0.0, 1.0)
}
