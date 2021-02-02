import fShader from './fShaderSource.frag'
import vShader from './vShaderSource.vert'
import {initShader, createBuffer, createRenderer} from '../utils/shader'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector('#canvas')
    const gl:WebGLRenderingContext = canvas.getContext('webgl')
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    const program:WebGLProgram = initShader(gl, vShader, fShader);
    const a_Position = gl.getAttribLocation(program, 'a_Position')
    const a_Size = gl.getAttribLocation(program, 'a_Size')
    const a_Color = gl.getAttribLocation(program, 'a_Color')

    const point: Array<number> = []

    for (let i = 0; i < 500; i++) {
        point.push(Math.random() * 2 - 1)
        point.push(Math.random() * 2 - 1)


        point.push(Math.random() * 4)

        point.push(Math.random())
        point.push(Math.random())
        point.push(Math.random())
        point.push(1.0)

    }
    const FSIZE = 4; // Float32Array 4字节一个
    let countVert = createBuffer(gl, new Float32Array(point), 7)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 7, 0)
    gl.enableVertexAttribArray(a_Position)

    gl.vertexAttribPointer(a_Size, 1, gl.FLOAT, false, FSIZE * 7, FSIZE * 2)
    gl.enableVertexAttribArray(a_Size)

    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, FSIZE * 7, FSIZE * 3)
    gl.enableVertexAttribArray(a_Color)

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.POINTS, 0, countVert)
    }

    const {renderer, gui} = createRenderer({
        cb:render
    })
    renderer()
}
