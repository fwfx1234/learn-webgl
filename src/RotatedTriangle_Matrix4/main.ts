import fShader from './fShaderSource.frag'
import vShader from './vShaderSource.vert'
import {initShader, createRenderer, createBuffer} from '../utils/shader'
import Matrix4 from '../utils/CuonMatrix'

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
        public s: number = 1
    }

    const controller = new Controller()
    let arr: Array<number> = []
    for(let i = 0; i < 360; i+=60) {
        arr.push(0.3 * Math.cos(i * Math.PI / 180), 0.3 * Math.sin(i * Math.PI / 180))
    }
    const n = createBuffer(gl, new Float32Array(arr), 2)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
    let i = 0;
    let matrix4 = new Matrix4()
    let translateMatrix = new Matrix4()
    function render(timeSpan: number) {
        // timeSpan 上次调用历时
        gl.clearColor(1.0, 1.0, 1.0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform4f(u_Color, controller.r, controller.g, controller.b, 1.0)
        matrix4.setRotate(0, 0,0, 1)
        gl.uniformMatrix4fv(u_RotateMatrix, false, matrix4.elements)

        translateMatrix.setTranslate(controller.x, controller.y, 0)
        gl.uniformMatrix4fv(u_Matrix, false, translateMatrix.rotate(controller.a, 0, 0, 1).elements)
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
        controller.a += (controller.s * (Math.PI / 180) * timeSpan) / 1000
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
    gui.add(controller, 's', 1, 3600)
}
