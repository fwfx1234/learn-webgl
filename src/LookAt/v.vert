attribute vec4 a_Position;
attribute vec4 aColor;

uniform mat4 uCamera;
uniform mat4 uTranslate;
varying vec4 vColor;
void main() {
    gl_Position = uCamera *uTranslate* a_Position;
    gl_PointSize = 10.0;
    vColor = aColor;
}
