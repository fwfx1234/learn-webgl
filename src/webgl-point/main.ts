import {initShader, createRenderer} from '../utils/shader'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    const gl: WebGLRenderingContext = canvas.getContext("webgl")


    const controller = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    }
    function draw() {
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        const V_SHADER_SOURCE = `
        void main() {
            gl_Position = vec4(${controller.x}, ${controller.y}, ${controller.z}, 1.0);
            gl_PointSize = 10.0;
        }
    `
        const F_SHADER_SOURCE = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
        initShader(gl, V_SHADER_SOURCE, F_SHADER_SOURCE)
        gl.drawArrays(gl.POINTS, 0, 1)
    }

    let {renderer, gui} = createRenderer({
        cb: draw
    })
    renderer()
    gui.add(controller, 'x', 0.0, 1.0)
    gui.add(controller, 'y', 0.0, 1.0)
    gui.add(controller, 'z', 0.0, 1.0)

}


