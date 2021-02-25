attribute vec4 aPosition;
attribute vec4 aColor;
uniform  mat4 uViewMatrix;
uniform mat4 uProjMatrix;
varying vec4 vColor;

void main() {
  gl_Position = uProjMatrix * uViewMatrix * aPosition;
  vColor = aColor;
}