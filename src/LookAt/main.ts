import fShader from './f.frag'
import vShader from './v.vert'
import { initShader, createRenderer, createBuffer } from '../utils/shader'
import Matrix4 from '../utils/CuonMatrix'

window.onload = function () {
  const canvas: HTMLCanvasElement = document.querySelector('canvas')
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  const gl: WebGLRenderingContext = canvas.getContext('webgl')

  const program: WebGLProgram = initShader(gl, vShader, fShader)

  const a_Position: number = gl.getAttribLocation(program, 'a_Position')
  const aColor = gl.getAttribLocation(program, 'aColor')
  const uCamera = gl.getUniformLocation(program, 'uCamera')
  const uTranslate = gl.getUniformLocation(program, 'uTranslate')

  gl.clearColor(0.0, 0.0, 0.0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  let arr: Array<number> = [
    0.0,
    0.5,
    -0.4,
    0.4,
    1.0,
    0.4,
    -0.5,
    -0.5,
    -0.4,
    0.4,
    1.0,
    0.4,
    0.5,
    -0.5,
    -0.4,
    1.0,
    0.4,
    0.4,

    0.0,
    0.5,
    -0.2,
    1.0,
    0.4,
    0.4,
    -0.5,
    -0.5,
    -0.2,
    1.0,
    1.0,
    0.4,
    0.5,
    -0.5,
    -0.2,
    1.0,
    1.0,
    0.4,

    0.0,
    0.5,
    -0.0,
    0.4,
    0.4,
    1.0,
    -0.5,
    -0.5,
    -0.0,
    0.4,
    0.4,
    1.0,
    0.5,
    -0.5,
    -0.0,
    1.0,
    0.4,
    0.4,

    // 0.0, 0.0, 0.0,  0.0, 1.0, 0.0,
    // 0.0, 1.0, 0.0,  0.0, 1.0, 0.0,

    // 0.0, 0.0, 0.0,  1.0, 0.0, 0.0,
    // 1.0, 0.0, 0.0,  1.0, 0.0, 0.0,

    // 0.0, 0.0, 0.0,  0.0, 0.0, 1.0,
    // 0.0, 0.0, 1.0,  0.0, 0.0, 1.0
  ]

  const n = createBuffer(gl, new Float32Array(arr), 6)
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 4 * 6, 0)
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 4 * 6, 4 * 3)

  gl.enableVertexAttribArray(a_Position)
  gl.enableVertexAttribArray(aColor)

  const controller = {
    x: 0.25,
    y: 0.2,
    z: 0.2,
    r: 0.01,
  }
  const camera = new Matrix4()
  camera.setOrtho(-0.5, 0.5, -0.5, 0.5, 0, 0.5)
  const translate = new Matrix4()
  translate.setRotate(0, 0, 0, 1)
  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    camera.setLookAt(controller.x, controller.y, controller.z, 0, 0, 0, 0, 1, 0)
    gl.uniformMatrix4fv(uCamera, false, camera.elements)
    translate.rotate(controller.r * ( Math.PI / 90), 0, 0, 1)
    gl.uniformMatrix4fv(uTranslate, false, translate.elements)
    gl.drawArrays(gl.TRIANGLES, 0, n)
  }

  const { renderer, gui } = createRenderer({
    cb: render,
  })
  renderer()
  gui.add(controller, 'x', -1, 1)
  gui.add(controller, 'y', -1, 1)
  gui.add(controller, 'z', -1, 1)
  gui.add(controller, 'r', -1.0, 1.0)
}
