import fShader from './f.frag'
import vShader from './v.vert'
import {initShader, createRenderer, createBuffer} from '../utils/shader'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("canvas")
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    const gl: WebGLRenderingContext = canvas.getContext('webgl')

    const program: WebGLProgram = initShader(gl, vShader, fShader)

    const a_Position: number = gl.getAttribLocation(program, 'a_Position')
    const u_Height = gl.getUniformLocation(program, 'u_Height')
    const u_Width = gl.getUniformLocation(program, 'u_Width')

    gl.clearColor(1.0, 1.0, 1.0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    let arr: Array<number> = [
        -1.0, -1.0,
        -1.0, 1.0,
        1.0, 1.0,
        1.0, -1.0,
    ]

    const n = createBuffer(gl, new Float32Array(arr), 2)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
    gl.uniform1f(u_Height, canvas.width)
    gl.uniform1f(u_Width, canvas.width)
    function render() {



        gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
    }


    const {renderer, gui} = createRenderer({
        cb: render
    })
    renderer()

}
