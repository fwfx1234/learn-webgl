// @ts-ignore
import * as dat from 'dat.gui';

import {gui, initStats} from "./index";

let cacheVShader = ''
let cacheFShader = ''
export function initShader(gl: WebGLRenderingContext, vShaderSource:string, fShaderSource: string, debug:boolean = false): WebGLProgram {
    if (cacheFShader === fShaderSource && cacheVShader === vShaderSource) {
        return
    }
    const v_shader:WebGLShader  = gl.createShader(gl.VERTEX_SHADER);
    const f_shader:WebGLShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(v_shader, vShaderSource)
    gl.shaderSource(f_shader, fShaderSource)
    gl.compileShader(v_shader)
    gl.compileShader(f_shader)
    if (!gl.getShaderParameter(v_shader, gl.COMPILE_STATUS)) {
        console.warn('linkProgram error', 'v_shader')
    }
    if (!gl.getShaderParameter(f_shader, gl.COMPILE_STATUS)) {
        console.warn('linkProgram error', 'f_shader')
    }
    cacheFShader = fShaderSource
    cacheVShader = vShaderSource
    const program:WebGLProgram = gl.createProgram();
    gl.attachShader(program, v_shader);
    gl.attachShader(program, f_shader);
    gl.linkProgram(program);
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    gl.useProgram(program)
    if (!linked) {
        console.warn('linkProgram', linked)
    }
    return program
}



const ref = window.requestAnimationFrame


interface IRenderParams {

    cb: Function,
}
interface IRenderResult {
    renderer: Function
    gui: dat.GUI
}

export function createRenderer(r: IRenderParams): IRenderResult {
    const stats = initStats();
    const g:dat.GUI = gui()
    let _time = Date.now()
    const renderer = () => {
        stats.update()
        let t = Date.now()
        r.cb(t - _time)
        _time = t
        ref(renderer)
    }
    return {
        renderer,
        gui: g
    }
}
export function createBuffer(gl: WebGLRenderingContext, vertices: Float32Array, size: number): number {
    const verticesBuffer: WebGLBuffer = gl.createBuffer()
    if (!verticesBuffer) {
        console.error(verticesBuffer, vertices)
        return -1
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    return vertices.length / size
}

export function initTextures(gl: WebGLRenderingContext, indexTexture: number, src: string):Promise<boolean|string> {
    const texture: WebGLTexture = gl.createTexture();
    const image: HTMLImageElement = new Image()
    image.src = src
    return new Promise(((resolve, reject) => {
        image.onload = function () {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1) // 对纹理图像进行y轴翻转
            gl.activeTexture(indexTexture) // 激活第n个纹理
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
            resolve(true)
        }
        image.onerror = function (error) {
            reject(error)
        }
    }))

}
