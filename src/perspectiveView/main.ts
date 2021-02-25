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
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0)

  projMatrix.setPerspective(30, canvas.width/ canvas.height, 1, 100)

  console.log(viewMatrix.elements)
  console.log(projMatrix.elements)

  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements)
  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  const verticesColors = new Float32Array([
    0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
    0.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
    1.25, -1.0,  -4.0,  1.0,  0.4,  0.4, 

    0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
    0.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
    1.25, -1.0,  -2.0,  1.0,  0.4,  0.4, 

    0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
    0.25, -1.0,   0.0,  0.4,  0.4,  1.0,
    1.25, -1.0,   0.0,  1.0,  0.4,  0.4, 

    -0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
   -1.25, -1.0,   0.0,  0.4,  0.4,  1.0,
   -0.25, -1.0,   0.0,  1.0,  0.4,  0.4, 

   -0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
   -1.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
   -0.25, -1.0,  -2.0,  1.0,  0.4,  0.4, 
    // Three triangles on the left side
   -0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
   -1.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
   -0.25, -1.0,  -4.0,  1.0,  0.4,  0.4, 

 

   
  ])
  const size = createBuffer(gl, verticesColors, 6)


  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 4 * 6, 0)
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 4 * 6, 4 * 3)

  gl.enableVertexAttribArray(aPosition)
  gl.enableVertexAttribArray(aColor)


  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.DEPTH_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, size)
   
  }
  const { renderer, gui } = createRenderer({
    cb: render,
  })
  renderer() 
}
