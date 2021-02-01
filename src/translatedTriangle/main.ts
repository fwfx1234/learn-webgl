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
    const u_Color = gl.getUniformLocation(program, 'u_Color')
    const u_MoverDiatance = gl.getUniformLocation(program, 'u_MoveDistance')
    const u_Cos = gl.getUniformLocation(program, 'u_Cos')
    const u_Sin = gl.getUniformLocation(program, 'u_Sin')
    class Controller {
        public r: number = 0.1
        public g: number = 0.5
        public b: number = 0.1
        public x: number = 0.0
        public y: number = 0.0
        public a: number = 0
    }

    const controller = new Controller()
    const n = createBuffer(gl, new Float32Array([0.2, 0.2, -0.2, 0.2, 0.0, -0.2]), 2)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)

    function render() {
        gl.clearColor(1.0, 1.0, 1.0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform4f(u_Color, controller.r, controller.g, controller.b, 1.0)
        gl.uniform4f(u_MoverDiatance, controller.x, controller.y, 0.0, 0.0)
        gl.uniform1f(u_Sin, Math.sin(controller.a))
        gl.uniform1f(u_Cos, Math.cos(controller.a))
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
        controller.a -= 0.005
    }


    const {renderer, gui} = createRenderer({
        cb: render
    })
    renderer()
    gui.add(controller, 'r', 0.0, 1.0)
    gui.add(controller, 'g', 0.0, 1.0)
    gui.add(controller, 'b', 0.0, 1.0)
    gui.add(controller, 'x', -1.0, 1.0)
    gui.add(controller, 'y', -1.0, 1.0)
    gui.add(controller, 'a', 0.0, Math.PI * 2)

}
