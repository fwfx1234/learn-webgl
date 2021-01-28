import {initShader, createRenderer} from '../utils/shader'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    const gl: WebGLRenderingContext = canvas.getContext("webgl")


    const controller = {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        size: 10.0,
        r: 0.0,
        g: 0.0,
        b: 0.0
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
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        }
    `
    const program: WebGLProgram = initShader(gl, V_SHADER_SOURCE, F_SHADER_SOURCE)
    const a_Position = gl.getAttribLocation(program, 'a_Position')
    if (a_Position < 0) {
        console.error('error', a_Position)
    }
    const a_Size = gl.getAttribLocation(program, 'a_Size')

    // const a_Color = gl.getAttribLocation(program, 'a_Color')

    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.vertexAttrib3f(a_Position, controller.x, controller.y, controller.z)
        gl.vertexAttrib1f(a_Size, controller.size)
        // gl.vertexAttrib3f(a_Color, controller.r, controller.g, controller.b)
        gl.drawArrays(gl.POINTS, 0, 1)
    }

    let {renderer, gui} = createRenderer({
        cb: draw
    })
    renderer()
    gui.add(controller, 'x', -1.0, 1.0)
    gui.add(controller, 'y', -1.0, 1.0)
    gui.add(controller, 'z', -1.0, 1.0)
    gui.add(controller, 'r', 0.0, 1.0)
    gui.add(controller, 'g', 0.0, 1.0)
    gui.add(controller, 'b', 0.0, 1.0)
    gui.add(controller, 'size', 0.0, 100.0)
}


