import fShader from './f.frag'
import vShader from './v.vert'
import img from './stone.jpeg'
import img2 from './cloth.jpg'
import {initShader, createRenderer, createBuffer, initTextures} from '../utils/shader'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("canvas")
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    const gl: WebGLRenderingContext = canvas.getContext('webgl')

    const program: WebGLProgram = initShader(gl, vShader, fShader)

    const a_Position: number = gl.getAttribLocation(program, 'a_Position')
    const a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord')
    const u_Sampler1 = gl.getUniformLocation(program, 'u_Sampler1')
    const u_Sampler2 = gl.getUniformLocation(program, 'u_Sampler2')
    gl.clearColor(1.0, 1.0, 1.0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    let arr: Array<number> = [
        -1.0, -1.0, 0.0, 10,
        -1.0, 1.0,  10, 10,
        1.0, 1.0,   10, 0,
        1.0, -1.0,  0, 0
    ]
 
    const n = createBuffer(gl, new Float32Array(arr), 4)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 4 * 4, 0)
    gl.enableVertexAttribArray(a_Position)
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 4 * 4, 4 * 2)
    gl.enableVertexAttribArray(a_TexCoord)
    function render() {
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
    }


    const {renderer, gui} = createRenderer({
        cb: render
    })
    Promise.all([initTextures(gl, gl.TEXTURE0, img), initTextures(gl, gl.TEXTURE1, img2)])
    .then(() => { 
        console.log('finish')
        gl.uniform1i(u_Sampler1, 0) 
        gl.uniform1i(u_Sampler2, 1)
        renderer()
    }).catch(e => {
        console.log(e)
    })

}
