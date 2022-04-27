import Matrix4 from '../utils/CuonMatrix'
import { createRenderer, initShader, createBuffer } from '../utils/shader'
import fShader from './f.frag'
import vShader from './v.vert'

window.onload = function () {
  const canvas: HTMLCanvasElement = document.querySelector('#canvas')
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  const gl: WebGLRenderingContext = canvas.getContext('webgl')

  const program = initShader(gl, vShader, fShader)

  const uProjMatrix = gl.getUniformLocation(program, 'uProjMatrix')
  const uViewMatrix = gl.getUniformLocation(program, 'uViewMatrix')
  const aPosition = gl.getAttribLocation(program, 'aPosition')
  const aColor =  gl.getAttribLocation(program, 'aColor')

  const projMatrix = new Matrix4()
  const viewMatrix = new Matrix4()

  projMatrix.setPerspective(30, canvas.width/ canvas.height, 1, 100)

  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  const verticesColors = new Float32Array([
     1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White   
    -1.0,  1.0,  1.0,     1.0,  0.0,  1.0,  // v1 Magenta
    -1.0, -1.0,  1.0,     1.0,  0.0,  0.0,  // v2 Red
     1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  // v3 Yellow
     1.0, -1.0, -1.0,     0.0,  1.0,  0.0,  // v4 Green
     1.0,  1.0, -1.0,     0.0,  1.0,  1.0,  // v5 Cyan
    -1.0,  1.0, -1.0,     0.0,  0.0,  1.0,  // v6 Blue
    -1.0, -1.0, -1.0,     0.0,  0.0,  0.0   // v7 Blac
  ])
  const indices = new Uint8Array([
    0, 1, 2,   0, 2, 3,    // front
    0, 3, 4,   0, 4, 5,    // right
    0, 5, 6,   0, 6, 1,    // up
    1, 6, 7,   1, 7, 2,    // left
    7, 4, 3,   7, 3, 2,    // down
    4, 7, 6,   4, 6, 5
  ])
  const size = createBuffer(gl, verticesColors, 6)

  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 4 * 6, 0)
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 4 * 6, 4 * 3)

  gl.enableVertexAttribArray(aPosition)
  gl.enableVertexAttribArray(aColor)

  createBuffer(gl, indices, 6, gl.ELEMENT_ARRAY_BUFFER)
  viewMatrix.setLookAt(3, 3, 7, 0, 0, 0, 0, 1, 0)

  const c = {x: 0.01, y: 1, z: 1}
  function render() {
    
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    viewMatrix.rotate(c.x, 0, 1, 0).rotate(c.x, 1, 0, 0).rotate(c.x, 0, 0, 1)
    gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements)

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0)

  }
  const { renderer, gui } = createRenderer({
    cb: render,
  })
  renderer() 
  gui.add(c, 'x', -100, 100)
  gui.add(c, 'y', -100, 100)
  gui.add(c, 'z', -100, 100)

}
