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
    const u_Matrix = gl.getUniformLocation(program, 'u_Matrix')
    const u_RotateMatrix = gl.getUniformLocation(program, 'u_RotateMatrix')
    class Controller {
        public r: number = 0.1
        public g: number = 0.5
        public b: number = 0.1
        public x: number = 0.0
        public y: number = 0.0
        public a: number = 0
        public s: number = 0.005
    }

    const controller = new Controller()
    let arr: Array<number> = []
    for(let i = 0; i < 360; i+=1) {
        arr.push(0.3 * Math.cos(i * Math.PI / 180), 0.3 * Math.sin(i * Math.PI / 180))
    }
    const n = createBuffer(gl, new Float32Array(arr), 2)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
    let i = 0;
    function render() {
        gl.clearColor(1.0, 1.0, 1.0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform4f(u_Color, controller.r, controller.g, controller.b, 1.0)
        //[ 1, 0, 0, dx,    x
        //  0, 1, 0, dy,    y
        //  0, 0, 1, dz,    z
        //  0, 0, 0, 1      1
        //]
        const matrix = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            controller.x, controller.y, 0, 1
        ])
        gl.uniformMatrix4fv(u_Matrix, false, matrix)
        gl.uniformMatrix4fv(u_RotateMatrix, false, new Float32Array([
            Math.cos(controller.a), Math.sin(controller.a), 0, 0,
            -Math.sin(controller.a), Math.cos(controller.a), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]))
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
        controller.a -= controller.s
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
    gui.add(controller, 's', 0.001, 1.0)
}
