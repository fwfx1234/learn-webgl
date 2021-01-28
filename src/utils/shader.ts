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

    const renderer = () => {
        stats.update()
        r.cb()
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
